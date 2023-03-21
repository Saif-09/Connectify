const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/connectify_db')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error(err.message);
  });
