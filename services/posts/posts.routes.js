const postRoutes = require('express').Router();
const { check } = require('express-validator');
const {
    createPost,
    updatePost,
    getAllPosts,
    getPostById
} = require('./posts.controller');

const {
    isAuthenticated
} = require('../../middlewares/authenticate');

postRoutes.post('/post/create', isAuthenticated, [], createPost);
postRoutes.put('/post/update/:id', isAuthenticated, [], updatePost);
postRoutes.get('/post/get-all/', isAuthenticated, [], getAllPosts);
postRoutes.get('/post/get-by-id/:id', isAuthenticated, [], getPostById);

module.exports = postRoutes;