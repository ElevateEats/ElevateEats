import express from "express";
import logger from "../utils/logger.js";
import Achievement from "../schema/achievementSchema.js";

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
    //Create achievement
    try {
        if (Object.keys(req.body).length === 0) {
            logger.error(
                "There was an error creating this achievement, match type: JSON",
            );
            return res.status(400).json({ error: "Empty request body" });
        }

        const newAchievement = await Achievement.create(req.body);
        logger.info(`Created new achievement with ID: ${newAchievement._id}`);
        res.status(201).json({
            message: "Post created successfully",
            achievement: newAchievement,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Server error creating achievement" });
    }
});

export default router;
