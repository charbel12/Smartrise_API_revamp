


module.exports = {
    permit: function (permission) {
        return (req, res, next) => {
            var _token = req.headers.authorization;
            var _claims = JSON.parse(Buffer.from(_token.split('.')[1], 'base64').toString("ascii"));
            var _permissions = _claims.permissions;
            var _p = permission.filter(element => _permissions.includes(element));;
            
            if(_p.length > 0){
                next();
            }
            else{
                res.status(403).json({
                    successful: false,
                    message: "You don't have the proper permission."
                });
                res.end();
            }
        }

    }

};
