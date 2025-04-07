import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    content: String,
    imageURL: String,
    timestamp: {type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;