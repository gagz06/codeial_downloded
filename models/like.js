const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the objectid of the liked object
    likeable :{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath : 'onModel'
    },
    // this field define the type of liked object since its dynamic object
    onModel: {
        type: String,
        require: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
}
);

const like = mongoose.model('Like',likeSchema);
module.exports = like;