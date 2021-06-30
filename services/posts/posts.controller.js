const { validationResult } = require('express-validator');
const {
    formatResponse,
    encrypt,
    constants
} = require('../../utils');

// load schema
const Posts = require('./posts.schema');

// load service
const postsService = require('./posts.services');
postsService({ Posts, constants });

/**
 * Function to create post
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function createPost(req, res) {
    try {
        const requestValidationErrors = validationResult(req);
        if (!requestValidationErrors.isEmpty()) {
            return formatResponse(res, false, 400, "Error in request params", {},
                requestValidationErrors.array());
        }
        const { articleHead, articleBody, author } = req.body;
        const createResponse = await postsService.create({ articleHead, articleBody, author });
        if (!createResponse.success) {
            return formatResponse(res, false, createResponse.code || 400, createResponse.message, {});
        }
        return formatResponse(res, true, 200, "post created", createResponse.data);
    } catch (error) {
        console.error(e);
        return formatResponse(res, false, 500, `Error detected on create, ${e.message}`);
    }
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