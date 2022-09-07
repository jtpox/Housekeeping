const { sequelize } = require('../../utils/database');

const { User: userModel, Log: logModel } = sequelize.models;

function uniqueUsername(value) {
    return userModel.findOne({
        where: {
            username: value,
        }
    }).then(user => {
        if(user) return Promise.reject('Username is already in use.');

        return true;
    }).catch(err => Promise.reject('Error checking username.'));
}

function uniqueEmail(value) {
    return userModel.findOne({
        where: {
            email: value,
        }
    }).then(user => {
        if(user) return Promise.reject('Email is already in use.');

        return true;
    }).catch(err => Promise.reject('Error checking email.'));
}

module.exports = {
    uniqueUsername,
    uniqueEmail,
};