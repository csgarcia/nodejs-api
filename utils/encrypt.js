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
    if (!process.env.ISSUER || !process.env.SUBJECT || !process.env.ISSUER || !process.env.EXPIRY) {
        console.error('Api token seeds are missing, config them first');
        process.exit(-1);
    }
    const options = {
        issuer: process.env.ISSUER,
        subject: process.env.SUBJECT,
        audience: process.env.ISSUER,
        expiresIn: process.env.EXPIRY
    };
    console.log(options);
    return jwt.sign(data, process.env.SECRET, options);
}

/**
 * Function to verify if token is valid
 * @param {String} token 
 * @returns 
 */
function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}


module.exports = {
    encryptValue,
    compareEncryptValue,
    getApiToken,
    verifyToken
}