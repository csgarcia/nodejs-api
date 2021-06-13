const constants = require('../../utils/constants')

// add dependencies on services
module.exports = (dependencies) => {
    /**
     * Login user
     * @param {String} user 
     * @param {String} password 
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

}