import express from 'express'
import User from "../schema/userSchema.js";
import logger from "../utils/logger.js";
const router =  express.Router()
router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        logger.info('Fetched all users');
        res.json(users);
    } catch (error) {
        logger.error(`Error fetching users: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

router.param('id', async (req,res,next,id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            logger.warn(`User not found with ID: ${id}`);
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        logger.error(`Invalid user ID: ${id}`);
        return res.status(400).json({ message: 'Invalid user ID' });
    }
});

router.get('/:id', (req, res) => {
    logger.info(`Fetched user with ID: ${req.user._id}`);
    res.status(200).json(req.user);
});

router.post('/', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            logger.error('Attempted to create user with empty request body');
            return res.status(400).json({ error: 'Empty request body' });
        }

        const { username, firstName, lastName, phoneNumber, password } = req.body;

        // Validate that all required fields are present
        if (!username || !firstName || !lastName || !phoneNumber || !password) {
            return res.status(400).json({ error: 'Please provide all required fields (username, first name, last name, phone number, password)' });
        }

        // Check if the username already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const newUser = await User.create(req.body);

        logger.info(`Created user: ${newUser._id}`);
        res.status(201).json({
            message: 'User created successfully',
            user: {
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                emailAddress: newUser.emailAddress,
                isAdmin: newUser.isAdmin,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        logger.error(`Server error creating user: ${error.message}`);
        res.status(500).json({ error: 'Server error creating user' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            logger.warn(`Attempted update but user not found: ${req.params.id}`);
            return res.status(404).json({ message: 'User not found' });
        }
        logger.info(`Updated user: ${user._id}`);
        res.json(user);
    } catch (error) {
        logger.error(`Error updating user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            logger.warn(`Attempted delete but user not found: ${req.params.id}`);
            return res.status(404).json({ message: 'User not found' });
        }
        logger.info(`Deleted user: ${req.params.id}`);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

export default router;