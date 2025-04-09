import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import ApiKey from '../schema/apiKeySchema.js';
import User from '../schema/userSchema.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

const user = await User.findOne({ phoneNumber: 'x' });
if (!user) {
    console.log('User not found');
    process.exit();
}

const newKey = new ApiKey({
    key: uuidv4(),
    userID: user._id,
    isActive: true,
});

await newKey.save();
console.log('🔑 API key created for user:', newKey.key);
process.exit();
