module.exports = {
    LOGIN: {
        MISSING_PARAMS: {
            code: 400,
            message: "Params [user password] are required."
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
    },
    POSTS: {
        MISSING_PARAMS: {
            code: 400,
            message: "Params [articleHead articleBody author] are required."
        },
        MISSING_POST_ID: {
            code: 400,
            message: "Param [id] is required."
        }
    }
}