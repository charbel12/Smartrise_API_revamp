const { Permission } = require('../../../database/models');

module.exports = {
    getPermissions: async function(req, res, callback = null) {
        try {
            const permissions = await Permission.findAll();
            console.log('permissions:', permissions)
            
            // Ensure callback exists before calling it
            if (callback) {
                 return callback(null, res.status(200).json({
                    successful: true,
                    err: null,
                    data: permissions
                }));
            }
        } catch (err) {
            if (callback) {
                return callback(null, res.status(400).json({
                    successful: false,
                    err
                }));
            }
        }
    }
}