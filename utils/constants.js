module.exports = {
    LOGIN: {
        MISSING_PARAMS: {
            code: 400,
            message: "Params user or password are required."
        },
        USER_NOT_FOUND: {
            code: 404,
            message: "User not found"
        },
        INVALID_CREDENTIALS: {
            code: 403,
            message: "Invalid Credentials."
        },
        INACTIVE_USER: {
            code: 401,
            message: "User is inactive, check data with API admin."
        }
    }
}