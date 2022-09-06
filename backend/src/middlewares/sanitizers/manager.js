const managerAndBelow = ['user', 'manager'];

/*
 * Function: Return null value if authorized user is manager and below.
 * Usage: customSanitizer: { options: returnNullIfManager }
 */
function returnUndefinedIfManager(value, { req }) {
    if(!managerAndBelow.includes(req.user.user_group)) return value;
    return undefined;
}

module.exports = {
    returnUndefinedIfManager,
};