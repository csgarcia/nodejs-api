const mongoose = require('../../db');
const logger = require('../../config/logger');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user: {
        type: String,
        unique: true
    },
    password: String,
    name: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Users = mongoose.model('users', usersSchema, 'users');
logger.info("** Defining Users schema via mongoose **");
module.exports = Users;