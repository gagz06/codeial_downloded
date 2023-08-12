const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to user google startegy
passport.use(new googleStrategy({
    clientID: "566408813929-8u6ivuk2ramnuirdkvuunl48s91i49rf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken,profile,done){
        // find user 
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error google startegy passport',err); return;}
            console.log(accessToken,refreshToken);
            console.log(profile);
            if(user){
                //if found set this as req.user
                return done(null,user);
            }
            else{
                // if not found create user and se it as req.user(sign in)
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user',err); return;}
                    return done(null,user);
                })
            }
        });
    }
));

module.exports=passport;