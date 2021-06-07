async function isAuthenticated(req, res, next) {
    console.log("TODO authentication");
    next();
};

async function isAdmin(req, res, next) {
    // if you want more middlewares add like this one
};

module.exports = {
    isAuthenticated,
    isAdmin
}