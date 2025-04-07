const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postID: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    content: String,
    timestamp: {type: Date, default: Date.now }
});

const Comment = mongoose.model('Comments', commentSchema)
export default Comment;