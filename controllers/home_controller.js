const Post = require('../models/post')

module.exports.home = function(req, res){
    //console.log(req.cookies);
    //res.cookie('id',30);
    // Post.find({}).then((posts)=>{
    //     return res.render('home', {
    //         title: "Ciodeial | Home",
    //         posts: posts
    //     });
    // });

    Post.find({}).populate('user').then((posts)=>{
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });


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



}

// module.exports.actionName = function(req, res){}