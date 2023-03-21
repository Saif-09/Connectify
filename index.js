const express = require('express');
const app =  express();
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes');


app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and scripts of subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
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

