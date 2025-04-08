import dotenv from 'dotenv';
import logger from './utils/logger.js'
import express from 'express'
import connectDB from './utils/db.js'
import apiKeyAuth from "./middleware/apiKeyAuth.js";
import postsRouter from './routes/posts.js';
import achievementsRouter from './routes/achievements.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000
await connectDB(process.env.MONGODB_URI);

app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send(`Hello World! ${res.statusCode}`)
});

app.use(apiKeyAuth);
app.use('/posts', postsRouter)
app.use('/achievements', achievementsRouter)

app.set('view engine', 'ejs')

app.listen(port, () =>{
        logger.info(`Elevate Eats listening on port ${port}`);
});


