const mergeRoutes = require('express').Router();
const userRoutes = require('../../services/users/users.routes');

mergeRoutes.use(userRoutes);

module.exports = mergeRoutes;