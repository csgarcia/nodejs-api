const userRoutes = require('express').Router();
const { check } = require('express-validator');
const {
    createController,
    loginController
} = require('./users.controller');

const {
    isAuthenticated,
    isAdmin
} = require('../../middlewares/authenticate');

userRoutes.post('/user/create', isAdmin, [
    check('user', 'user is required for create.').not().isEmpty(),
    check('password', 'password is required for create.').not().isEmpty()
], createController);

userRoutes.post('/user/login', [
    check('user', 'user is required for login.').not().isEmpty(),
    check('password', 'password is required for login.').not().isEmpty()
], loginController);

module.exports = userRoutes;