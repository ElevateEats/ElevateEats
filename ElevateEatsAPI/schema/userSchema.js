import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    middleName: String,
    phoneNumber: {type: String, required: true},
    emailAddress: String,
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema)
export default User;