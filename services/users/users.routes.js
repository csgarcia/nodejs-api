const userRoutes = require('express').Router();
const { check } = require('express-validator');
const {
    createUser,
    loginUser
} = require('./users.controller');

const {
    isAuthenticated
} = require('../../middlewares/authenticate');

userRoutes.post('/user/create', isAuthenticated, [
    check('user', 'user is required for create.').not().isEmpty(),
    check('password', 'password is required for create.').not().isEmpty()
], createUser);

userRoutes.post('/user/login', [
    check('user', 'user is required for login.').not().isEmpty(),
    check('password', 'password is required for login.').not().isEmpty()
], loginUser);

module.exports = userRoutes;