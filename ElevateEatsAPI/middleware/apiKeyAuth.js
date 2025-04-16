import ApiKey from '../schema/apiKeySchema.js';
import logger from '../utils/logger.js';

const apiKeyAuth = async (req, res, next) => {
    const key = req.header('x-api-key') || req.query.apiKey;

    if (!key) {
        return res.status(401).json({ error: 'API key missing' });
    }

    try {
        const apiKeyDoc = await ApiKey.findOne({
            key,
            isActive: true,
        }).populate('userID');

        if (!apiKeyDoc) {
            return res
                .status(403)
                .json({ error: 'Invalid or inactive API key' });
        }

        // Update last used timestamp
        apiKeyDoc.lastUsedAt = new Date();
        await apiKeyDoc.save();

        // Attach user to request
        req.user = apiKeyDoc.userID;
        next();
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default apiKeyAuth;
