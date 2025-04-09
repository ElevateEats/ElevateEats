// scripts/createUser.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../schema/userSchema.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

const existing = await User.findOne({ email: 'you@example.com' });
if (existing) {
    console.log('User already exists:', existing);
    process.exit();
}

const newUser = new User({
    username: 'johnDoe',
    firstName:'john',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    isAdmin: false,
});

await newUser.save();
console.log('🎉 Admin user created:', newUser);
process.exit();
