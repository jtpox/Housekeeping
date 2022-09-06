const express = require('express');

const { logIn, logOut } = require('../controllers/auth');

const passport = require('../utils/passport');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Sup!');
});

router.post(
    '/',
    passport.authenticate('local', { session: false }),
    logIn,
);

/* router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    logOut,
); */

module.exports = router;