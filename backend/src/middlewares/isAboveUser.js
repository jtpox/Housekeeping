const allowedGroups = ['manager', 'admin'];

/*
 * Function: Checks if authorized user is manager or admin.
 */
function isManagerOrAdmin(req, res, next) {
    if(allowedGroups.includes(req.user.user_group)) {
        return next();
    }

    return res.status(401).send('Unauthorized');
}

/*
 * Function: Checks if authorized user is admin.
 */
function isAdmin(req, res, next) {
    if(req.user.user_group === 'admin') {
        return next();
    }

    return res.status(401).send('Unauthorized');
}

module.exports = {
    isManagerOrAdmin,
    isAdmin,
};