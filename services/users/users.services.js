const {
    constants
} = require('../../utils');

// add dependencies on services
module.exports = (dependencies) => {

    /**
     * Function to create users for API usage
     * @param {String} user 
     * @param {String} password 
     * @param {String} name - optional 
     * @param {String} lastName - optional
     * @returns 
     */
    async function create(user, password, name = "", lastName = "") {
        try {
            // validate params
            if (!user || !password) {
                return {
                    success: false,
                    code: constants.LOGIN.MISSING_PARAMS.code,
                    message: constants.LOGIN.MISSING_PARAMS.message
                }
            }
            const { Users } = dependencies;
            //check if user exists with mongoose schema and save user
            const result = await Users.create({
                user,
                password,
                name,
                lastName
            });
            // return response
            return {
                success: true,
                data: {
                    user: result.user
                }
            };
        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in create user, ${error.message}`
            }
        }
    }
    /**
     * Login user to get token for requests
     * @param {String} user - user to compare
     * @param {String} password - not encrypted password to crypt and compare
     * @returns 
     */
    async function login(user, password) {
        try {
            if (!user || !password) {
                return {
                    success: false,
                    code: constants.LOGIN.MISSING_PARAMS.code,
                    message: constants.LOGIN.MISSING_PARAMS.message
                }
            }
            // Use whatever method 
            const { Users } = dependencies;
            const userInfo = await Users.findOne({ user, password });
            if (!userInfo) {
                return {
                    success: false,
                    code: constants.LOGIN.USER_NOT_FOUND.code,
                    message: constants.LOGIN.USER_NOT_FOUND.message
                }
            }
            if (!userInfo.active) {
                return {
                    success: false,
                    code: constants.LOGIN.INACTIVE_USER.code,
                    message: constants.LOGIN.INACTIVE_USER.message
                }
            }
            return {
                success: true,
                data: {
                    name: userInfo.name,
                    token: ""
                }
            }
        } catch (error) {
            return {
                success: false,
                code: 0,
                message: `Error in login, ${error.message}`
            }
        }
    }

    module.exports.login = login;
    module.exports.create = create;

}