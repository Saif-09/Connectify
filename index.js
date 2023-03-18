const express = require('express');
const app =  express();
const port = 80;
const routes = require('./routes');

app.use('/',routes);




app.listen(port)
  .on('error', function(err) {
    console.log(`Error in starting server ${err} `);
  })
  .on('listening', function() {
    console.log(`Server running on port:${port}`);
  });

