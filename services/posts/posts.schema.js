const mongoose = require('../../db');
const logger = require('../../config/logger');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    articleHead: {
        type: String,
        required: true
    },
    articleBody: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Posts = mongoose.model('posts', postSchema, 'posts');
logger.info("** Defining Posts schema via mongoose **");
module.exports = Posts;