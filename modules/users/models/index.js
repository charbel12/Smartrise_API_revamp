const bcrypt = require('bcryptjs');
const { User, UserRole, Role } = require('../../../models');
const salt = 10;

module.exports = {
    async createUser(req, res, callback = null) {
        try {
            const { username, password } = req.body.credentials;
            const {
                first_name,
                last_name,
                middle_name,
                contact_number,
                email,
                status
            } = req.body.details;

            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) {
                return callback(null, res.status(406).json({ message: "Username already exists" }));
            }

            const hash = bcrypt.hashSync(password, salt);
            const now = new Date();

            const user = await User.create({
                username,
                password: hash,
                password_salt: salt,
                force_change_password: true,
                first_name,
                last_name,
                middle_name,
                contact_number,
                email,
                date_created: now,
                date_modified: now,
                status
            });

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: user
            }));
        } catch (err) {
            return callback(err, res.status(400).json({ message: err.message }));
        }
    },

    async getUserById(req, res, callback = null) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{
                    model: Role,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }]
            });

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: user
            }));
        } catch (err) {
            console.log('err: ', err);
            return callback(err, res.status(400).json({ message: err.message }));
        }
    },

    async deleteUserById(req, res, callback = null) {
        try {
            const id = req.params.id;
            await UserRole.destroy({ where: { user_id: id } });
            await User.destroy({ where: { id } });

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: 0
            }));
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    },

    async updatetUserById(req, res, callback = null) {
        try {
            const id = req.params.id;
            const updates = req.body;

            const [affectedRows] = await User.update(updates, { where: { id } });

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: { affectedRows }
            }));
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    },

    async updateUserRole(req, res, callback = null) {
        try {
            const id = req.params.id;
            const now = new Date();
            const existing = await UserRole.findOne({ where: { user_id: id } });

            if (existing) {
                await UserRole.update({ role_id: req.body.roles }, { where: { user_id: id } });
            } else {
                await UserRole.create({
                    user_id: id,
                    role_id: req.body.roles,
                    date_created: now,
                    date_modified: now
                });
            }

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: 0
            }));
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    },

    async getUserRole(req, res, callback = null) {
        try {
            const id = req.params.id;

            const roles = await Role.findAll({
                include: [{
                    model: UserRole,
                    where: { user_id: id }
                }]
            });

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: roles
            }));
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    },

    async updateUserPass(req, res, callback = null) {
        try {
            const id = req.params.id;
            const hash = bcrypt.hashSync(req.body.password, salt);

            await User.update({ password: hash }, { where: { id } });

            return callback(null, res.status(200).json({ successful: true, message: null }));
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    },

    async getAllUsers(req, res, callback = null) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'username', 'first_name', 'last_name', 'contact_number', 'email', 'status']
            });

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: users
            }));
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    },

    async checkAvailability(req, res, callback = null) {
        try {
            const { username } = req.params;
            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) {
                return callback(null, res.status(200).send("Username already exists"));
            } else {
                return callback(null, res.status(200).send("Username is available"));
            }
        } catch (err) {
            return callback(err, res.status(403).json({ successful: false, message: err.message }));
        }
    }
};