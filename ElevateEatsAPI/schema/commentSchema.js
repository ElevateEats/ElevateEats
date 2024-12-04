const mongoose = require('mongoose');
const {Timestamp} = require("mongodb");

const commentSchema = new mongoose.Schema({
    postID: mongoose.Schema.Types.ObjectId, ref: 'posts',
    userID: mongoose.Schema.Types.ObjectId, ref: 'users',
    content: String,
    timestamp: Timestamp
});