const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    achievementID: {type: mongoose.Schema.Types.ObjectId, ref: 'achievements'},
    timestamp: {type: Date, default: Date.now }
});

const UserAchievement = mongoose.model("UserAchievement", userAchievementSchema)
export default UserAchievement;