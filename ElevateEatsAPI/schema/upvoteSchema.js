const mongoose = require('mongoose');

const upvoteSchema = new mongoose.Schema({
    postID: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    timestamp: {type: Date, default: Date.now }
})

const UpVote = mongoose.model('Like', upvoteSchema)

export default UpVote;
