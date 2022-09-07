const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const argon2 = require('argon2');

const { sequelize } = require('./database');
const { User, Log } = sequelize.models;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (username, password, done) => {
    User.findOne({
        where: {
            email: username,
        }
    }).then(user => {
        if(!user) {
            return done(null, false, { message: 'Incorrect Email.' });
        }

        return argon2
            .verify(user.password, password)
            .then(success => { 
                if(success) {
                    Log.addEntry(
                        user.id,
                        null,
                        'auth.success',
                        `${user.username} (User ID: ${user.id}) successfully logged in.`,
                    );
                    return done(null, user);
                } else {
                    Log.addEntry(
                        user.id,
                        null,
                        'auth.failure',
                        `${user.username} (User ID: ${user.id}) failed to log in.`,
                    );
                    return done(null, false, { message: 'Incorrect Details.' });
                }
             });
    }).catch(err => { return done(err); }); 
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_JWT_SECRET,
}, (jwtPayload, done) => {
    const { id } = jwtPayload;

    if(!id) {
        return done(null, false);
    }

    User.findOne({
        where: {
            id,
        },
    }).then(user => {
        if(user) {
            return done(null, user);
        }

        return done(null, false);
    }).catch(err => { return done(err, false) });
}));

module.exports = passport;