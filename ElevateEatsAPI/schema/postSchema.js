const mongoose = require('mongoose');
const {Timestamp} = require("mongodb");

const postSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId, ref: 'users',
    content: String,
    imageURL: String,
    timestamp: Timestamp
});