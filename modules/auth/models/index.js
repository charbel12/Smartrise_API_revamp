const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../../../models');
const _key = process.env.TOKEN_KEY;

module.exports = {

    async userSignin(req, res, callback = null) {
        try {
            const { username, password } = req.body;

            // Find user and eager-load roles and permissions
            const user = await User.findOne({
                where: { username },
                include: {
                    model: Role,
                    include: Permission
                }
            });

            if (!user) {
                return callback(true, 401, { message: "Username is incorrect!" });
            }

            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) {
                return callback(true, 401, { message: "Password is incorrect!" });
            }

            let codes = [];
            let urls = [];

            user.Roles.forEach(role => {
                role.Permissions.forEach(perm => {
                    codes.push(perm.code);
                    urls.push(perm.url);
                });
            });

            // Remove duplicates
            codes = [...new Set(codes)];
            urls = [...new Set(urls)];

            const token = jwt.sign({
                userId: user.id,
                username: user.username,
                firstname: user.first_name,
                lastname: user.last_name,
                permissions: codes
            }, _key, { expiresIn: '7d' });

            const status = user.force_change_password ? 403 : 200;

            callback(false, status, {
                msg: 'Logged in!',
                userId: user.id,
                email: user.email,
                username: user.username,
                name: user.first_name,
                lastname: user.last_name,
                urls,
                token
            });

        } catch (err) {
            callback(err, 500, { message: "Internal server error." });
        }
    },

    async forceChangePassword(req, res, userSignin, callback = null) {
        try {
            const { username, password, newPassword } = req.body;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                return callback(true, 401, { message: "Invalid Username/Password" });
            }

            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) {
                return callback(true, 401, { message: "Invalid Username/Password" });
            }

            const hash = await bcrypt.hash(newPassword, 10);
            await user.update({ password: hash, force_change_password: 0 });

            req.body.password = newPassword;

            this.userSignin(req, res, callback);

        } catch (err) {
            callback(err, 500, { message: "Internal server error." });
        }
    }

};