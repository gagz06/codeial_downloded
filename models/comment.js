const mongoose = new require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.Schema.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.Schema.ObjectId,
        ref: 'Pst'
    }
},
{
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports=Comment;