const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((post)=>{
        if(post){
            return res.redirect('back');
        }
    })
    .catch((err)=>{
            console.log('error in creating post',err);
            return;
        
    });
}