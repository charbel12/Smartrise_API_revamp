const { Role, Permission, RolesPermissions, sequelize } = require('../../../models');

async function fetchRolePermissions(req, res, callback = null) {
    try {
        const id = req.params.id;
        const role = await Role.findOne({
            where: { id },
            include: [{
                model: Permission,
                through: { attributes: [] }, // exclude junction table info
            }],
        });

        if (!role) {
            return res.status(404).json({ successful: false, message: "Role not found" });
        }

        // Format response to exactly what frontend expects
        const response = {
            id: role.id,
            name: role.name,
            description: role.description,
            status: role.status,
            date_created: role.date_created,
            date_modified: role.date_modified,
            display_admin: role.display_admin,
            display_customer: role.display_customer,
            created_at: role.created_at,
            updated_at: role.updated_at,

            // Permissions assigned to the role
            Permissions: role.Permissions.map(p => ({
                id: p.id,
                name: p.name,
                code: p.code,
                description: p.description,
                permission_group: p.permission_group, // if you have this field
                // add other fields your frontend needs here
            })),
        };

        return callback(null, res.status(200).json({
            successful: true,
            err: null,
            data: response
        }));

    } catch (err) {
        return callback(err, res.status(500).json({ successful: false, err: err.message }));
    }
}


module.exports = {
    createRole: async function(req, res, callback = null) {
        const t = await sequelize.transaction();
        try {
            const { name, description = '', status, permissions } = req.body;

            const existing = await Role.findOne({ where: { name } });
            if (existing) {
                return callback(null, res.status(406).send({ msg: 'Role already exists' }));
            }

            const now = new Date().toISOString().slice(0, 10);
            const newRole = await Role.create({
                name,
                description,
                status,
                date_created: now,
                date_modified: now,
            }, { transaction: t });

            if (Array.isArray(permissions) && permissions.length > 0) {
                // Here permissions is expected to be array of IDs
                await newRole.setPermissions(permissions, { transaction: t });
            }

            await t.commit();

            return callback(null, res.status(200).json({
                successful: "true",
                message: null,
                data: {
                    insertId: newRole.id,
                    // other meta you want to keep here or remove if not needed
                }
            }));
        } catch (err) {
            await t.rollback();
            return callback(err, res.status(400).send({ msg: err.message }));
        }
    },

    getRole: async function(req, res, callback = null) {
        try {
            const id = req.params.id;
            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).json({ successful: false, message: 'Role not found' });
            }

            const permissions = await Permission.findAll({
                include: {
                    model: Role,
                    where: { id },
                    through: { attributes: [] }
                }
            });

            const data = {
                id: role.id,
                name: role.name,
                description: role.description,
                status: role.status,
                date_created: role.date_created,
                date_modified: role.date_modified,
                display_admin: role.display_admin,
                display_customer: role.display_customer,
                created_at: role.created_at,
                updated_at: role.updated_at,
                permissions: permissions.map(p => ({
                    id: p.id,
                    name: p.name,
                    code: p.code,
                    description: p.description
                }))
            };

            return callback(null, res.status(200).json({
                successful: true,
                err: null,
                data
            }));
        } catch (err) {
            return callback(err, res.status(500).json({ successful: false, err }));
        }
    },

    getAllRoles: async function(req, res, callback = null) {
        try {
            const roles = await Role.findAll();
            return callback(null, res.status(200).json({
                successful: true,
                err: null,
                data: roles
            }));
        } catch (err) {
            return callback(err, res.status(400).json({
                successful: false,
                err
            }));
        }
    },

    getPermissions: async function(req, res, callback = null) {
        try {
            const permissions = await Permission.findAll();
            return callback(null, res.status(200).json({
                successful: true,
                err: null,
                data: permissions
            }));
        } catch (err) {
            return callback(null, res.status(400).json({
                successful: false,
                err
            }));
        }
    },

    deleteRole: async function(req, res, callback = null) {
        const t = await sequelize.transaction();
        try {
            const id = req.params.id;

            await RolesPermissions.destroy({ where: { role_id: id }, transaction: t });
            await Role.destroy({ where: { id }, transaction: t });

            await t.commit();

            return callback(null, res.status(200).json({
                successful: true,
                message: null,
            }));
        } catch (err) {
            await t.rollback();
            return callback(err, res.status(200).json({
                successful: false,
                message: err.message,
                data: 0
            }));
        }
    },

    updateRole: async function(req, res, callback = null) {
        const t = await sequelize.transaction();
        try {
            const id = req.params.id;
            const { name, description = '', status, permissions } = req.body;

            const existing = await Role.findOne({
                where: {
                    name,
                    id: {
                        [sequelize.Op.ne]: id
                    }
                }
            });

            if (existing) {
                return callback(null, res.status(400).send({ msg: 'Role already exists' }));
            }

            await Role.update({ name, description, status }, { where: { id }, transaction: t });

            await RolesPermissions.destroy({ where: { role_id: id }, transaction: t });

            if (Array.isArray(permissions) && permissions.length > 0) {
                const values = permissions.map(pid => ({
                    role_id: id,
                    permission_id: pid
                }));
                await RolesPermissions.bulkCreate(values, { transaction: t });
            }

            await t.commit();

            return callback(null, res.status(200).json({
                successful: true,
                message: null
            }));
        } catch (err) {
            await t.rollback();
            return callback(err, res.status(400).json({
                successful: false,
                err: err.message
            }));
        }
    },

    checkAvailability: async function(req, res, callback = null) {
        try {
            const { rolename } = req.params;
            const existing = await Role.findOne({ where: { name: rolename } });

            if (existing) {
                return callback(null, res.status(200).send("Role already exists"));
            }

            return callback(null, res.status(200).send("Available"));
        } catch (err) {
            return callback(err, res.status(403).json({
                successful: false,
                message: err.message
            }));
        }
    }
};