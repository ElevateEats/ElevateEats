import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: String,
  phoneNumber: { type: String, required: true },
  emailAddress: String,
});

const User = mongoose.model("User", userSchema);
export default User;
