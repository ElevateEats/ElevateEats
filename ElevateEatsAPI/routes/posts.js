import express from 'express'
// import { getUsers } from '../controllers/postController.js'
import Post from "../schema/postSchema.js";
import logger from "../utils/logger.js";

const router = express.Router()
router.use(express.json())

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
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


//Saving post information through middleware
router.param('id', async (req,res,next, id) => {
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        req.post = post;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }
})

//Get A Post
router.get('/:id', (req, res) => {
    res.status(200).json(req.post);
})

//Create Post
router.post('/', async (req,res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            logger.error("There was an error creating this post, match type: JSON")
            return res.status(400).json({error: 'Empty request body'});
        }

        const newPost = await Post.create(req.body);
        res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error creating post' });
    }
});


//Add comment
router.post('/:id/comments', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push(req.body); // { userID, content }
        await post.save();
        res.status(201).json({ message: 'Comment added', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//Add like
router.post('/:id/upvotes', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        post.upvotes.push({ userID: req.body.userID });
        await post.save();
        res.status(201).json({ message: 'Post upvoted', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;