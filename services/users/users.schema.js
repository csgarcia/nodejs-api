const mongoose = require('../../db');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    user: String,
    password: String,
    name: String,
    last_name: String,
    active: Boolean
});

const Users = mongoose.model('users', usersSchema, 'users');
console.log("** Defining Users schema via mongoose **");
module.exports = Users;