const Post = require('../models/post');
const Comment = require('../models/comment');
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
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting object id into string
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({
                post: req.params.id
            },function(err){
                return res.redirect('back');
            });
        }
        else{
            Window.alert('Not allowed to delete another user comment');
            return res.redirect('back');
        }
    });
}