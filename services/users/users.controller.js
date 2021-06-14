const { validationResult } = require('express-validator');

const {
    response
} = require('../../utils');

const Users = require('./users.schema');

// include model and dependencies
const loginModel = require('./users.services');
loginModel({ Users });

async function createController(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return response(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password, name, lastName } = req.body;
        const createResponse = await loginModel.create(user, password, name, lastName);
        if (!createResponse.success) {
            return response(res, false, createResponse.code || 400, createResponse.message);
        }
        return response(res, true, 200, "ok", {});
    } catch (e) {
        console.error(e);
        return response(res, false, 500, `Error detected on create, ${e.message}`);
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
            return response(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password } = req.body;
        const loginResponse = await loginModel.login(user, password);
        if (!loginResponse.success) {
            return response(res, false, loginResponse.code || 400, loginResponse.message);
        }
        return response(res, true, 200, "ok", loginResponse.data)
    } catch (e) {
        console.error(e);
        return response(res, false, 500, `Error detected on login, ${e.message}`);
    }
};

module.exports = {
    createController,
    loginController
};