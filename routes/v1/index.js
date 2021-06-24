const mergeRoutes = require('express').Router();
const userRoutes = require('../../services/users/users.routes');
const postRoutes = require('../../services/posts/posts.routes');

mergeRoutes.use(userRoutes);
mergeRoutes.use(postRoutes);

module.exports = mergeRoutes;