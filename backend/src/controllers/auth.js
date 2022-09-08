const jwt = require('jsonwebtoken');

/*
 * GET /api/auth
 * Headers: { Authorization: 'Barer <token>' }
 * Function: Refresh user details.
 */
function refreshUserDetails(req, res) {
    res.status(200).json(req.user);
}

/*
 * POST /api/auth
 * Body: { email:string, password:string }
 * Function: Handles login.
 */
function logIn(req, res) {
    const {
        id,
        username,
        email,
        mobile_number,
        user_group,
        department,
        createdAt: created_at,
    } = req.user;

    const user = {
        id,
        username,
        email,
        mobile_number,
        user_group,
        department,
        created_at,
    };

    const token = jwt.sign(
        user,
        process.env.ACCESS_JWT_SECRET,
        {
            expiresIn: `${process.env.COOKIE_LIFESPAN}d`,
        }
    );
    // const expiry = new Date(Date.now() + (parseInt(process.env.COOKIE_LIFESPAN) * 24 * 60 * 60 * 1000));
    // const refreshToken = '';
    res.status(200).json({
        token,
        expires_in: process.env.COOKIE_LIEFSPAN,
        user,
    });
}

module.exports = {
    refreshUserDetails,
    logIn,
};