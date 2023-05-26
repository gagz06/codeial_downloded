const User = require('../models/user');
const user =  require('../models/user');


module.exports.profile = function(req, res){
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
    if(req.cookies.user_id){
        User.findOne({user_id:req.body.user_id}).then((user)=>{
            if(user){
                return res.render('user_profile', {
                      title: 'User Profile',
                      user: user
            })
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp= function(req,res){
return res.render('user_sign_up',{
    title: "Codeial | Sign UP"
})
}

module.exports.signIn= function(req,res){
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



// sign in method
module.exports.createSession = function(req,res){
    
    // steps to authenticate
    // find the user
    User.findOne({email:req.body.email})
    .then((user)=>{
        //handle user if found
        if(user){
            //handle password which doesn't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }
        else{
            //handle user not found
            return res.redirect('back');
        }
    }).catch((err)=>{
        
            console.log("Error in signin in",err);
            return res.redirect('back');
    });



  

  
}