const express = require('express');

const { checkSchema } = require('express-validator');

const { body, validationResult } = require('express-validator');

const passport = require('../utils/passport');

const {
    getUsers,
    addUser,
    updateUser,
    updateUserHousekeeping,
    deleteUser,
} = require('../controllers/user');

const {
    returnUndefinedIfManager
} = require('../middlewares/sanitizers/manager');

const {
    hashPassword
} = require('../middlewares/sanitizers/password');

const {
    uniqueUsername,
    uniqueEmail,
} = require('../middlewares/validators/unique');

const { sequelize } = require('../utils/database');

const { User: userModel } = sequelize.models;

const {
    isManagerOrAdmin,
    isAdmin,
} = require('../middlewares/isAboveUser');

const router = express.Router();

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    isManagerOrAdmin,
    getUsers,
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    checkSchema({
        username: {
            in: ['body'],
            isString: true,
            errorMessage: 'Username is wrong.',
            custom: {
                options: uniqueUsername,
                errorMessage: 'Username is being used.',
            },
        },
        password: {
            in: ['body'],
            isString: true,
            errorMessage: 'Password is wrong.',
            customSanitizer: {
                options: hashPassword,
            },
        },
        email: {
            in: ['body'],
            isString: true,
            isEmail: true,
            errorMessage: 'Email is wrong.',
            custom: {
                options: uniqueEmail,
                errorMessage: 'Email is being used.',
            },
        },
        mobile_number: {
            in: ['body'],
            isInt: true,
            errorMessage: 'Mobile number is wrong.',
        },
        user_group: {
            in: ['body'],
            isString: true,
            matches: {
                options: [/\b(?:user|manager|admin)\b/],
                errorMessage: 'Invalid user group.',
            },
            errorMessage: 'User group is wrong.',
        },
        department: {
            in: ['body'],
            isString: true,
            errorMessage: 'Department is wrong.',
        },
    }),
    addUser,
);

router.put(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkSchema({
        mobile_number: {
            in: ['body'],
            isInt: true,
            errorMessage: 'Mobile number is wrong.',
        },
    }),
    updateUser,
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isManagerOrAdmin,
    checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            errorMessage: 'User ID is wrong.',
            custom: {
                options: (value) => {
                    return userModel.findByPk(value).then(result => {
                        if(result) {
                            return result;
                        }

                        return Promise.reject('User does not exist');
                    });
                    // return false;
                },
            },
            customSanitizer: {
                options: (value) => {
                    return userModel.findByPk(value).then(result => result);
                },
            }
        },
        username: {
            in: ['body'],
            isString: true,
            errorMessage: 'Username is wrong.',
            customSanitizer: {
                options: returnUndefinedIfManager
            }
        },
        password: {
            in: ['body'],
            isString: true,
            errorMessage: 'Password is wrong.',
            customSanitizer: {
                options: (value, options) => {
                    /*
                     * Improvise as express-validator does not allow multiple customSanitizers.
                     * Last use: [returnUndefinedIfManager, hashPassword]
                     */
                    const isUndefined = returnUndefinedIfManager(value, options);

                    if(isUndefined === undefined) return undefined;
                    return hashPassword(value);
                },
            }
        },
        email: {
            in: ['body'],
            isEmail: true,
            errorMessage: 'Email is wrong.',
            customSanitizer: {
                options: returnUndefinedIfManager
            }
        },
        mobile_number: {
            in: ['body'],
            isInt: true,
            errorMessage: 'Mobile number is wrong.',
        },
        user_group: {
            in: ['body'],
            isString: true,
            matches: {
                options: [/\b(?:user|manager|admin)\b/],
                errorMessage: 'Invalid user group.',
            },
            errorMessage: 'User group is wrong.',
            customSanitizer: {
                options: returnUndefinedIfManager
            }
        },
        department: {
            in: ['body'],
            isString: true,
            errorMessage: 'Department is wrong.',
            customSanitizer: {
                options: returnUndefinedIfManager
            }
        },
    }),
    updateUserHousekeeping,
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            errorMessage: 'User ID is wrong.',
            custom: {
                options: (value) => {
                    return userModel.findByPk(value).then(result => {
                        if(result) {
                            return result;
                        }

                        return Promise.reject('User does not exist');
                    });
                    // return false;
                },
            },
            customSanitizer: {
                options: (value) => {
                    return userModel.findByPk(value).then(result => result);
                },
            }
        },
    }),
    deleteUser,
);

module.exports = router;