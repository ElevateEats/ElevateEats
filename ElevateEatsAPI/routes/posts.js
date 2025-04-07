import express from 'express'
// import { getUsers } from '../controllers/postController.js'
import Post from "../schema/postSchema.js";
import logger from "../utils/logger.js";
const router = express.Router()

router.use(express.json())
const posts = [
    {
        "id": 0,
        "user_id":123,
        "content": "abc",
        "image_url": "imgurl",
        "timestamp": "025959"
    },
    {
        "id": 1,
        "user_id":456,
        "content": "xyz",
        "image_url": "imgurl1",
        "timestamp": "030000"
    }
]

//Static Routes

//Get All Posts
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
router.post('/:id/comments', (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        console.log("There was an error creating this comment, match type: JSON")
        res.status(404).send('404 Bad Request')
    }else{
    console.log(req.body)
    res.status(202).json(req.body)
    }
})

//Add like
router.post('/:id/likes', (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        console.log("There was an error liking this post, match type: JSON")
        res.status(404).send('404 Bad Request')
    }else{
    console.log(req.body.likes)
    res.status(202).json(req.body.likes)
    }
})
  module.exports = router