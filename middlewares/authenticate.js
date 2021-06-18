const {
    formatResponse,
    encrypt
} = require('../utils');

async function isAuthenticated(req, res, next) {
    try {
        const token = req.header('token');
        if (!token) {
            return formatResponse(res, false, 401, "Authentication failed", {});
        }
        encrypt.verifyToken(token);
        next();
    } catch (error) {
        // check jwt errors on npm documentation
        if (error.name === 'TokenExpiredError') {
            return formatResponse(res, false, 401, 'Token is Expired');
        }
        if (error.name === 'JsonWebTokenError') {
            return formatResponse(res, false, 401, 'Invalid token, validate with admin');
        }
    }
};

module.exports = {
    isAuthenticated
}