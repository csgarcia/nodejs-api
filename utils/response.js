/**
 * Function to define responses for all endpoints and manipulate data before response
 * @param {*} res 
 * @param {Boolean} success
 * @param {Number} httpCode 
 * @param {String} message 
 * @param {Object} data
 * @param {Object[]} errors
 */
function response(res, success, httpCode, message, data = {}, errors = []) {
    let jsonResponse = {
        success,
        code: httpCode,
        message,
    }
    if (success) {
        jsonResponse.data = data;
    } else {
        jsonResponse.errors = errors;
    }
    res.status(httpCode).json(jsonResponse);
}

module.exports = response;