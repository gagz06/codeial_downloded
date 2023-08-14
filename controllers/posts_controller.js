const Post = require("../models/post");
const Comment = require("../models/comment");
const userProfile= require("../models/user");
module.exports.create = async function (req, res) {
  try {
    let post=await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    //let userDetails = await userProfile.findById(req.user._id);
    //const {password,...rest}=userDetails;
    //to populate user in post and also exclude password field to be
    //sent in response
    post = await Post.findById(post._id).populate("user", "-password").exec();
    
    // to check if req is ajax
    if(req.xhr){
      //post = await post.populate('user', 'name').execPopulate();
      return  res.status(200).json({
        data: {
          post: post
        },
        message:'Post created'
      });
    }

    req.flash('success','New Post added !');
    return res.redirect("back");
  } catch (err) {
    //console.log("Error", err);
    req.flash('error',err);
    return res.redirect("back");
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id: req.params.id
          },
          message: "Post deleted"
        })
      }

      req.flash('success','Post and associated comments deleted !');
      return res.redirect("back");
    } else {
      //Window.alert("Not allowed to delete anyother user comment");
      req.flash('error','Not allowed to delete another user comment !');
      return res.redirect("back");
    }
  } catch (err) {
    //console.log("Error", err);
    req.flash('error',err);
    return res.redirect("back");
  }
};
