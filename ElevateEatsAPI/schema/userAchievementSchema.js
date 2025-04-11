import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    achievementID: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "userAchievements" },
);

const UserAchievement = mongoose.model(
  "UserAchievement",
  userAchievementSchema,
);
export default UserAchievement;
