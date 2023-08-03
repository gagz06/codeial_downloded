const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  //async
  //console.log(req.cookies);
  //res.cookie('id',30);
  // Post.find({}).then((posts)=>{
  //     return res.render('home', {
  //         title: "Ciodeial | Home",
  //         posts: posts
  //     });
  // });

  // using the instead of exec
  // Post.find({}).populate('user').then((posts)=>{
  //     return res.render('home', {
  //         title: "Codeial | Home",
  //         posts: posts
  //     });
  // });

  try {
    let posts = await Post.find({}) // await 1
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({}); // await2

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log('Error',err);
    return;
  }
}

  // code conerted by chat gpt
  //     Post.find({})
  //   .populate('user')
  //   .then(posts => {
  //     return res.render('home', {
  //       title: "Ciodeial | Home",
  //       posts: posts
  //     });
  //   })
  //   .catch(err => {
  //     // Handle error
  //     console.error(err);
  //     // Return an error response
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   });
//};

// module.exports.actionName = function(req, res){}
