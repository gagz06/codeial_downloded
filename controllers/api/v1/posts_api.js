const Post =require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res) {

    let posts = await Post.find({}) // await 1
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
      const {password,...rest}=posts;

    return res.status(200).json({
        message : "List of all posts",
        posts: rest
    })
}

module.exports.destroy = async function (req, res) {
    try {
      let post = await Post.findById(req.params.id);
     // if (post.user == req.user.id) {
        post.remove();
        await Comment.deleteMany({ post: req.params.id });
        return res.status(200).json({
            message: "Post and associated comments deleted successfully!"
        })
    } catch (err) {
        console.log(err);
      return res.status(500).json({
        message: "Internal server Error"
      });
    }
  };
  