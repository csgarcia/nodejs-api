const { validationResult } = require('express-validator');

const {
    response
} = require('../../utils');

const {
    login
} = require('./users.model');

async function loginController(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return response(res, false, 422, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { user, password } = req.body;
        const loginResponse = await login(user, password);
        return response(res, true, 200, "ok", loginResponse.data)
    } catch (e) {
        console.error(e);
        return response(res, false, 500, `Error detected on login, ${e.message}`);
    }
};

module.exports = {
    loginController
};