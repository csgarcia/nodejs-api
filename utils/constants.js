module.exports = {
    LOGIN: {
        MISSING_PARAMS: {
            code: 400,
            message: "Params user or password are required."
        },
        USER_NOT_FOUND: {
            code: 404,
            message: "User not found for passed credentials."
        },
        INACTIVE_USER: {
            code: 401,
            message: "User is inactive, check data with API admin."
        }
    }
}