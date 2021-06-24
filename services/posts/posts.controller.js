const { validationResult } = require('express-validator');

const {
    formatResponse,
    encrypt,
    constants
} = require('../../utils');

const Posts = require('./posts.schema');

const postsService = require('./posts.services');
postsService({ Posts, constants });

async function createPost(req, res) {
    return formatResponse(res, true, 200, "post created", {});
}

async function updatePost(req, res) {
    return formatResponse(res, true, 200, "post updated", {});
}

async function getAllPosts(req, res) {
    return formatResponse(res, true, 200, "list if posts", []);
}

async function getPostById(req, res) {
    return formatResponse(res, true, 200, "post", {});
}

module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    getPostById
};