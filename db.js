const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;


