const mongoose = require('mongoose');

//connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/connectify_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
    return mongoose.connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
