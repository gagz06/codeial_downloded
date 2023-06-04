const User = require('../models/user');
//const user =  require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
return res.render('user_sign_up',{
    title: "Codeial | Sign UP"
})
}

module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign IN"
    })
    }

//sign up
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){console.log('error in finding user');return;}
    //     if(!user){
    // User.create(req.body,function(err,user){
    //     if(err){console.log('error in creating user');return;}
    //     return res.redirect('/user/sign-in');
    //         });
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });

    User.findOne({email:req.body.email})
    .then((err,user)=>{
        if(err){console.log("User already exist");return res.redirect('back');}
        if(!user){
            User.create(req.body)
            .then(()=>{res.redirect('/users/sign-in');})
            .catch((err)=>{console.log('error in creating user');});
        }
        else{
            return res.redirect('back');
        }
    });
}
// sign in
module.exports.createSession = function(req,res){
return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
            return;
        }
    });

    return res.redirect('/');
}