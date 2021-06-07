const dotenv = require('dotenv').config();
if (dotenv.error) {
    throw dotenv.error;
}
const express = require('express');
const parser = require('body-parser');
const app = express();
const { PORT } = process.env;
const allRoutes = require('./routes');
// const requestValidator = require('express-validator');

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));
// parse application/json
app.use(parser.json());

// add logger

// add extensions for DB

// add express validator
// app.use(requestValidator());

// add services
app.use(allRoutes);

// check route - this is optional
app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Welcome to User Management Services',
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;