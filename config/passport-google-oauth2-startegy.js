const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "566408813929-8u6ivuk2ramnuirdkvuunl48s91i49rf.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
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
