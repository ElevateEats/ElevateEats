import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    lastUsedAt: { type: Date }
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);
export default ApiKey;
