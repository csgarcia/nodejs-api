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
        const { articleHead, articleBody, author } = req.body;
        const createResponse = await postsService.create({ articleHead, articleBody, author });
        if (!createResponse.success) {
            return formatResponse(res, false, createResponse.code || 400, createResponse.message, {});
        }
        return formatResponse(res, true, 200, "post created", createResponse.data);
    } catch (error) {
        console.error(error);
        return formatResponse(res, false, 500, `Error detected on create resource, ${error.message}`);
    }
}

/**
 * Function to update post
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function updatePost(req, res) {
    try {
        const id = req.params.id || null;
        const { articleHead, articleBody, author } = req.body;
        const updateResponse = await postsService.update(id, { articleHead, articleBody, author });
        if (!updateResponse.success) {
            return formatResponse(res, false, updateResponse.code || 400, updateResponse.message, {});
        }
        return formatResponse(res, true, 200, "post updated", {});
    } catch (error) {
        console.error(error);
        return formatResponse(res, false, 500, `Error detected on update resource, ${error.message}`);
    }
}

/**
 * Function to get posts
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getAllPosts(req, res) {
    try {
        const fields = req.body || {};
        const response = await postsService.getAll(fields);
        if (!response.success) {
            return formatResponse(res, false, response.code || 400, response.message, {});
        }
        return formatResponse(res, true, 200, "posts", response.data);
    } catch (error) {
        console.error(error);
        return formatResponse(res, false, 500, `Error detected on update resource, ${error.message}`);
    }
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