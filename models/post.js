const mongoose = new require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //incude the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;