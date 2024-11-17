const mongoose = require('mongoose');
const {Timestamp} = require("mongodb");

const userAchievementSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId, ref: 'users',
    achievementID: mongoose.Schema.Types.ObjectId, ref: 'achievements',
    timestamp: Timestamp
});