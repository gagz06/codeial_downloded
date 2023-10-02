const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require('./environment');
passport.use(
  new googleStrategy(
    {
      clientID:env.google_clientID,
      clientSecret: env.google_client_Secret,
      callbackURL: env.google__callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log("Error in Google strategy passport", err);
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
