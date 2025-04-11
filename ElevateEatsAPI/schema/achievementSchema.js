import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  iconURL: String,
});

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
