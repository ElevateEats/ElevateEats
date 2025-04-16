import express from "express";
// import { getUsers } from '../controllers/postController.js'
import Post from "../schema/postSchema.js";
import logger from "../utils/logger.js";

const router = express.Router();
router.use(express.json());

//Get All Posts
//Future postControllerExample
//router.get('/', postController.getUsers)
//class PostController {
//static getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   }
//   catch (err) {
//     res.status(500).json({ error: err.message });
//      }
//  };
//}

//export default postController
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        logger.info("Fetched all posts");
        res.json(posts);
    } catch (err) {
        logger.error(`Error fetching posts: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

//Saving post information through middleware
router.param("id", async (req, res, next, id) => {
    try {
        const post = await Post.findById(id);
        if (!post) {
            logger.warn(`Post not found with ID: ${id}`);
            return res.status(404).json({ message: "Post not found" });
        }
        req.post = post;
        next();
    } catch (error) {
        logger.error(`Invalid post ID: ${id}\n${error}`);
        return res.status(400).json({ message: `Invalid post ID` });
    }
});

//Get A Post
router.get("/:id", (req, res) => {
    logger.info(`Fetched post with ID: ${req.post._id}`);
    res.status(200).json(req.post);
});

//Create Post
router.post("/", async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            logger.error("Attempted to create post with empty request body");
            return res.status(400).json({ error: "Empty request body" });
        }

        const newPost = await Post.create(req.body);
        logger.info(`Created new post with ID: ${newPost._id}`);
        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        logger.error(`Server error creating post: ${error.message}`);
        res.status(500).json({ error: "Server error creating post" });
    }
});

//Add comment
router.post("/:id/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push(req.body);
        await post.save();
        logger.info(`Added comment to post ${req.params.id}`);
        res.status(201).json({ message: "Comment added", post });
    } catch (error) {
        logger.error(`Error adding comment: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

//Add like
router.post("/:id/upvotes", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.upvotes.push({ userID: req.body.userID });
        await post.save();
        logger.info(
            `Added upvote to post ${req.params.id} by user ${req.body.userID}`,
        );
        res.status(201).json({ message: "Post upvoted", post });
    } catch (error) {
        logger.error(`Error adding upvote: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

export default router;
