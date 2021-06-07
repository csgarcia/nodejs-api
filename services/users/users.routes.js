const userRoutes = require('express').Router();
const { check } = require('express-validator');
const {
    loginController
} = require('./users.controller');

const {
    isAuthenticated
} = require('../../middlewares/authenticate');

userRoutes.post('/user/login', [
    check('user', 'user is required for login.').not().isEmpty(),
    check('password', 'password is required for login.').not().isEmpty()
], loginController);

module.exports = userRoutes;