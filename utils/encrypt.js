const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Return a value encrypted for current lib installed
 * If you want to change the lib it's ok, this is centralized here for all modules
 * @param {String} value 
 * @returns {String}
 */
function encryptValue(value) {
    return bcrypt.hashSync(value, 10);
}

/**
 * Function to compare a new value to a encrypted one, 
 * returns true if those values are the same.
 * @param {String} value 
 * @param {String} encryptedValue 
 * @returns {Boolean}
 */
function compareEncryptValue(value, encryptedValue) {
    return bcrypt.compareSync(value, encryptedValue);
}

/**
 * Function to build api token for users
 * @param {Object} data 
 * @returns 
 */
function getApiToken(data) {
    const options = {
        issuer: process.env.ISSUER,
        subject: process.env.SUBJECT,
        audience: process.env.ISSUER,
        expiresIn: process.env.EXPIRY
    };
    console.log(options);
    return jwt.sign(data, process.env.SECRET, options);
}


module.exports = {
    encryptValue,
    compareEncryptValue,
    getApiToken
}