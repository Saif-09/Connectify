const passport  = require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users')

module.exports.profile = async (req, res) => {
    try {
        res.render('user_profile', {
            title: 'User Profile'
        })
    } catch (err) {
        console.log(err);
    }
}

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            // find a user and establish the identity
            const user = await User.findOne({ email });
            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false, { message: 'Invalid username/password' });
            }
            return done(null, user);
        } catch (err) {
            console.log('Error in finding user --> Passport')
            return done(err);
        }
    }
));

// serializing the user which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log('Error in finding user --> Passport');
            return done(null, false, { message: 'User not found in deserialization' });
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

module.exports = passport;

