const express = require('express');

const { logIn, refreshUserDetails } = require('../controllers/auth');

const passport = require('../utils/passport');

const router = express.Router();

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    refreshUserDetails,    
);

router.post(
    '/',
    passport.authenticate('local', { session: false }),
    logIn,
);

module.exports = router;