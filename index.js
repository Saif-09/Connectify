const express = require('express');
const app =  express();
const port = 80;
const routes = require('./routes');

//use express router
app.use('/',routes);


//set view engine
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port)
  .on('error', function(err) {
    console.log(`Error in starting server ${err} `);
  })
  .on('listening', function() {
    console.log(`Server running on port:${port}`);
  });

