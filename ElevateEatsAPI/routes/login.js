import express from "express";
import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js';

const router = express.Router()
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !user.verifyPassword(password)) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

export default router;
