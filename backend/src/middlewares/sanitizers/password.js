const argon2 = require('argon2');

function hashPassword(value) {
    return argon2.hash(value).then(result => result);
}

function verifyPassword(hash, value) {
    return argon2.verify(hash, value).then(result => result);
}

module.exports = {
    hashPassword,
    verifyPassword,
};