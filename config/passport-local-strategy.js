const passport = require('passport');

const LocalStartegy = require('passport-local').Strategy;

const User = require('../models/user');
//aurthentication using passport
passport.use(new LocalStartegy({
    usernameField: 'email'
    },
    function(email,password,done){
        //find user and establish  the identity
        User.findOne({email: email})
        .then((user)=>{
            if(!user||user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }
            return done(null,user);
        })
        .catch((err)=>{
            console.log('Error in finding user --> passport1');
            return done(err);
        });

    }
));

//serializing the user  to decide which key is to be keptin cookies
passport.serializeUser(function(user,done){
done(null,user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
User.findById(id)
.then((user)=>{
    return done(null,user);
})
.catch((err)=>{ 
    console.log('Error in finding user --> passport2');
    return done(err);});
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in, then pass on the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not authenticated
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user containes the current signed in user from the session cookie
        // and we are just sending this to the local views
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;