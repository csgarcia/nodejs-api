const { validationResult } = require('express-validator');

const {
    formatResponse,
    encrypt,
    constants
} = require('../../utils');

const Users = require('./users.schema');

// include model and dependencies
const usersService = require('./users.services');
usersService({ Users, encrypt, constants });

/**
 * Function to manage create users
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function createUser(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return formatResponse(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password, name, lastName } = req.body;
        const createResponse = await usersService.create(user, password, name, lastName);
        if (!createResponse.success) {
            return formatResponse(res, false, createResponse.code || 400, createResponse.message);
        }
        return formatResponse(res, true, 200, "ok", {});
    } catch (error) {
        console.error(error);
        return formatResponse(res, false, 500, `Error detected on create, ${error.message}`);
    }
}

/**
 * Controller to manage login request
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function loginUser(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return formatResponse(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password } = req.body;
        const loginResponse = await usersService.login(user, password);
        if (!loginResponse.success) {
            return formatResponse(res, false, loginResponse.code || 400, loginResponse.message);
        }
        return formatResponse(res, true, 200, "ok", loginResponse.data)
    } catch (error) {
        console.error(error);
        return formatResponse(res, false, 500, `Error detected on login, ${error.message}`);
    }
};

module.exports = {
    createUser,
    loginUser
};