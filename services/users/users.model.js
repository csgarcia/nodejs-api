async function login(user, password) {
    return {
        success: true,
        data: {
            userName: "Carlos García",
            token: "someTokenForRequest"
        }
    }
}

module.exports = {
    login
}