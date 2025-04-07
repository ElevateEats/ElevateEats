import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    imageURL: String,
    timestamp: {type: Date, default: Date.now , immutable: true},
    comments: [{
        userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        content: String,
        timestamp: {type: Date, default: Date.now }
    }],
    upvotes: [{
        userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        timestamp: {type: Date, default: Date.now }
    }]
});

const Post = mongoose.model('Post', postSchema);
export default Post;