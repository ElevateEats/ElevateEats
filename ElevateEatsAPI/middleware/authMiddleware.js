import jwt from 'jsonwebtoken';

// JWT Middleware to Protect Routes
const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Token missing or invalid' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res
            .status(403)
            .json({ error: `Invalid or expired token ${error}` });
    }
};

export default jwtAuth;
