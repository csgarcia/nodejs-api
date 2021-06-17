const { validationResult } = require('express-validator');

const {
    formatResponse,
    encrypt
} = require('../../utils');

const Users = require('./users.schema');

// include model and dependencies
const loginModel = require('./users.services');
loginModel({ Users, encrypt });

/**
 * Function to manage create users
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function createController(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return formatResponse(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password, name, lastName } = req.body;
        const createResponse = await loginModel.create(user, password, name, lastName);
        if (!createResponse.success) {
            return formatResponse(res, false, createResponse.code || 400, createResponse.message);
        }
        return formatResponse(res, true, 200, "ok", {});
    } catch (e) {
        console.error(e);
        return formatResponse(res, false, 500, `Error detected on create, ${e.message}`);
    }
}

/**
 * Controller to manage login request
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function loginController(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return formatResponse(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password } = req.body;
        const loginResponse = await loginModel.login(user, password);
        if (!loginResponse.success) {
            return formatResponse(res, false, loginResponse.code || 400, loginResponse.message);
        }
        return formatResponse(res, true, 200, "ok", loginResponse.data)
    } catch (e) {
        console.error(e);
        return formatResponse(res, false, 500, `Error detected on login, ${e.message}`);
    }
};

module.exports = {
    createController,
    loginController
};