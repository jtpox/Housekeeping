const { Op } = require('sequelize');

const argon2 = require('argon2');

const { validationResult } = require('express-validator');

const { sequelize } = require('../utils/database');

const { User: userModel, Log: logModel } = sequelize.models;

/*
 * GET /api/user
 * Headers: { Authorization: 'Barer <token>' }
 * Function:
 * List all users if authorized user is admin.
 * List all users of authorized user's department if authorized user is manager.
 */
function getUsers(req, res) {
    if(req.user.user_group === 'user') {
        const { 
            id,
            username,
            email,
            mobile_number,
            user_group,
            department,
            createdAt: created_at,
        } = req.user;

        return res.json({
            id,
            username,
            email,
            mobile_number,
            user_group,
            department,
            created_at,
        });
    }
    
    let query = (req.user.user_group === 'admin')?
        userModel.findAll({
            attributes: { exclude: ['password'] }
        }) : userModel.findAll({
            attributes: { exclude: ['password'] },
            where: {
                department: req.user.department,
            }
        });

    // Add activity into the logs.
    logModel.addEntry(
        req.user.id,
        null,
        (req.user.user_group === 'admin')? 'users.view.all' : 'users.view.sameDepartment',
        `${req.user.username} (User ID: ${req.user.id}) viewed ${(req.user.user_group === 'admin')? 'all users' : 'users in the same department'}.`,
    );

    return query
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
}

/*
 * POST /api/user
 * Headers: { Authorization: 'Barer <token>' }
 * Body: { username: String, password: String, email: String, mobile_number: Integer, user_group: Enum(admin,manager,user), department: String }
 * Function: Create a new user.
 */
async function addUser(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() })
    } 

    const newUser = userModel.build(req.body);

    // Add activity into the logs.
    logModel.addEntry(
        req.user.id,
        null,
        'users.add',
        `${req.user.username} (User ID: ${req.user.id}) created new user (${JSON.stringify({ username: req.body.username, email: req.user.email })}).`,
    );

    return newUser.save()
        .then(result => res.json({ ...req.body, password: null }))
        .catch(err => res.status(500).json(err));
}

/*
 * PUT /api/user
 * Headers: { Authorization: 'Barer <token>' }
 * Body: { mobile_number: Integer }
 * Function: User can update their mobile number only.
 */
function updateUser(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() })
    }

    // Add activity into the logs.
    logModel.addEntry(
        req.user.id,
        req.user.id,
        'users.update',
        `${req.user.username} (User ID: ${req.user.id}) updated user details (${JSON.stringify({ from: req.user.mobile_number, to: req.body.mobile_number })}).`,
    );

    const updateUser = userModel.update(
        {
            mobile_number: req.body.mobile_number,
        },
        {
            where: {
                id: req.user.id,
            }
        },
    ).then(result => res.json({ mobile_number: req.body.mobile_number }))
        .catch(err => res.status(500).json(err));
}

/*
 * PUT /api/user/:id
 * Headers: { Authorization: 'Barer <token>' }
 * Body: { username: String, password: String, email: String, mobile_number: Integer, user_group: Enum(admin,manager,user), department: String }
 * Function:
 * Manager can only modify phone number in the same department.
 * Admin can modify any fields of any user.
 * 
 * Relevant req.body fields will return undefined if authorized user is manager.
 */
function updateUserHousekeeping(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() })
    }

    const {
        id: userId,
        username,
        email,
        mobile_number,
        user_group,
        department,
    } = req.params.id;

    // Add activity into the logs.
    logModel.addEntry(
        req.user.id,
        userId,
        'users.update',
        `${req.user.username} (User ID: ${req.user.id}) updated user details (${JSON.stringify({ from: { id: userId, username, email, mobile_number, user_group, department }, to: { ...req.body, password: null } })}).`,
    );

    return userModel.update(req.body, {
        where: {
            id: userId,
        },
    }).then(result => res.json({ ...req.body, password: null }))
        .catch(err => res.status(500).json(err));

    return res.json({});
}

/*
 * DELETE /api/user/:id
 * Headers: { Authorization: 'Barer <token>' }
 * Function: Admin can delete user.
 */
function deleteUser(req, res) {
    const {
        id: userId,
        username,
        email
    } = req.params.id;

    // Add activity into the logs.
    logModel.addEntry(
        req.user.id,
        userId,
        'users.delete',
        `${req.user.username} (User ID: ${req.user.id}) deleted user (${JSON.stringify({ username, email })}).`,
    );

    return userModel.destroy({
        where: {
            id: userId,
        },
    }).then(result => res.json({ id: userId }))
        .catch(err => res.status(500).json(err));
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    updateUserHousekeeping,
    deleteUser,
};