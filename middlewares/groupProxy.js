const os = require('os');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const logger = require('../helpers/logger');

let localIps = [];

/**
 * Gets all IPv4 addresses of the current machine.
 * @returns {string[]} - Array of IP addresses.
 */
function getLocalIps() {
  const interfaces = os.networkInterfaces();
  const ips = ['127.0.0.1', 'localhost'];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

localIps = getLocalIps();

const groupProxy = async (req, res, next) => {
  // Routes that should NEVER be proxied, always handled locally
  const nonProxiedPrefixes = ['/users', '/roles', '/permissions', '/auth'];
  if (nonProxiedPrefixes.some(prefix => req.path.startsWith(prefix))) {
    return next();
  }

  if (req.headers['x-smartrise-proxied']) {
    // logger.info('X-Smartrise-Proxied header found. Passing request to local handler.');
    return next();
  }
  
  const groupId =
  req.headers['x-group-id'] ||
  req.body?.groupId ||
  req.params?.groupId ||
  req.body?.group ||
  req.query?.groupId ||
  req.params?.group ||
  req.query?.group ||
  req.body?.groupID ||
  req.params?.groupID ||
  req.query?.groupID;

  if (!groupId) {
    return next();
  }

  try {
    const piConfigPath = path.join(__dirname, '..', 'configs', 'pi', 'pi.json');
    const piConfig = JSON.parse(fs.readFileSync(piConfigPath, 'utf8'));
    
    const group = piConfig.data.find(g => parseInt(g.GroupID) === parseInt(groupId));

    if (!group || !group.location) return next();
    
    const groupIpAddress = group.location.split(':')[0];

    if (localIps.includes(groupIpAddress)) return next();
    
    // Always proxy to the API port, not the WS port
    const targetPort = process.env.APP_PORT || 9300;
    const targetUrl = `http://${groupIpAddress}:${targetPort}${req.originalUrl}`;

    try {
      const response = await axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        headers: {
          ...req.headers,
          'X-Smartrise-Proxied': 'true',
          host: group.location,
        },
        params: req.query,
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).send(error.response.data);
      }
      return res.status(502).json({ message: 'Bad Gateway: Could not connect to remote group.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error in proxy.' , err: error});
  }
};

module.exports = groupProxy;
