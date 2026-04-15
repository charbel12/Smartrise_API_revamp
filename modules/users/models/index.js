const bcrypt = require('bcryptjs');
const { User, Role } = require('../../../database/models');
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
                status,
                role_id
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
                status,
                role_id: role_id || null
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
                    attributes: ['id', 'name']
                }]
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

    async deleteUserById(req, res, callback = null) {
        try {
            const id = req.params.id;
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
            const role_id = req.body.roles;

            await User.update({ role_id, date_modified: new Date() }, { where: { id } });

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

            const user = await User.findByPk(id, {
                include: [{
                    model: Role,
                    attributes: ['id', 'name', 'description', 'status', 'display_admin', 'display_customer']
                }]
            });

            if (!user) {
                return callback(null, res.status(404).json({ successful: false, message: 'User not found' }));
            }

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
                data: user.Role || null
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
                attributes: ['id', 'username', 'first_name', 'last_name', 'contact_number', 'email', 'status', 'role_id'],
                include: [{
                    model: Role,
                    attributes: ['id', 'name']
                }]
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