const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
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
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success','Post and associated comments deleted !');
      return res.redirect("back");
    } else {
      //Window.alert("Not allowed to delete another user comment");
      req.flash('error','Not allowed to delete another user comment !');
      return res.redirect("back");
    }
  } catch (err) {
    //console.log("Error", err);
    req.flash('error',err);
    return res.redirect("back");
  }
};
