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

module.exports = passport;