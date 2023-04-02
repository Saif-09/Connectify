const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require ('connect-mongo');
const store = MongoStore.create({
  mongoUrl: 'mongodb://127.0.0.1:27017/connectify_db',
  ttl: 24 * 60 * 60 // 1 day
});
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
  name:'connectify',
  //todo change the secret before deployement in production mode
  secret:'connectifysecret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10 // 10 years
  },
  store: store,
  function(err){
    console.log(err || 'connect-mongodb setup ok');
  }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port)
  .on('error', function(err) {
    console.log(`Error in starting server ${err} `);
  })
  .on('listening', function() {
    console.log(`Server running on port:${port}`);
});

db().then(res => {
  console.log("Database connected");
})