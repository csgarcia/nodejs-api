const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if (!process.env.MONGODB_URI) {
    console.error('Please set MONGO_URI');
    process.exit(-1);
}

mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connection.on('connected', () => {
    console.info('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(-1);
});

mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected');
});

// to avoid warning (node:2529) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

module.exports = mongoose;