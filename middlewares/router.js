const BODY_PARSER = require('body-parser');
const JWT = require('jsonwebtoken');

module.exports = {
    CORS: function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    },
    Authenticated: function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, authorization");

        if (!req.headers.authorization) {
            res.status(401).json({
                "message": "Authorization token is missing"
            });
            return;
        } else {
            const tokenHeader = req.headers.authorization;
            const token = tokenHeader && tokenHeader.startsWith("Bearer ") ?
                tokenHeader.slice(7) :
                tokenHeader;

            var _key = process.env.TOKEN_KEY;

            JWT.verify(token, _key, function(err, payload) {
                if (err) {
                    if (err.name == "TokenExpiredError") {
                        res.status(440);
                    }

                    res.json({
                        "message": err
                    });
                    return;
                }

                if (payload) {
                    // USER.get(payload.userid,function(err,result){
                    // req.user=result[0];
                    req.user = {};
                    req.user = payload;
                    next()
                        // });
                } else {
                    //next()
                    res.json({
                        "message": "Authentication failed."
                    });
                    return;
                }
            });
        }
    },
    USE_STANDARD: function(APP) {
        APP.use(BODY_PARSER.json({ strict: false }));
        APP.use(BODY_PARSER.urlencoded({ extended: true }));
        APP.use(this.CORS)
    },
    USE_AUTHENTICATED: function(APP) {
        APP.use(BODY_PARSER.json({ strict: false }));
        APP.use(BODY_PARSER.urlencoded({ extended: true }));
        APP.use(this.Authenticated)
    }
}