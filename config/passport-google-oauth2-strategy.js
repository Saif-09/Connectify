const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(
  new googleStrategy(
    {
      clientID: '710531646306-7pemmkfs7ol6dsq8quito39t6dcvbbp4.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
      clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
      callbackURL: "http://localhost:80/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          // if found, set this user as req.user
          done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
          });
          done(null, newUser);
        }
      } catch (err) {
        console.log('error in google strategy-passport', err);
        done(err, null);
      }
    }
  )
);

module.exports = passport;
