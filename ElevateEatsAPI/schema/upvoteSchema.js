const mongoose = require('mongoose');
const {Timestamp} = require("mongodb");

const upvoteSchema = new mongoose.Schema({
    postID: mongoose.Schema.Types.ObjectId, ref: 'posts',
    userID: mongoose.Schema.Types.ObjectId, ref: 'users',
    timestamp: Timestamp
})