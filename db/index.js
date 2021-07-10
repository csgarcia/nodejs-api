const mongoose = require('mongoose');
const logger = require('../config/logger');

mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if (!process.env.MONGODB_URI) {
    logger.error('Please set MONGO_URI');
    process.exit(-1);
}

mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connection.on('connected', () => {
    logger.info('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(-1);
});

mongoose.connection.on('disconnected', () => {
    logger.error('MongoDB disconnected');
});

// to avoid warning (node:2529) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);
// to avoid warning (node:1262) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
mongoose.set('useFindAndModify', false);

module.exports = mongoose;