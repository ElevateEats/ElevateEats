import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'

import postsRouter from './routes/posts.js';
import achievementsRouter from './routes/achievements.js';
import logger from './utils/logger.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 3000

await connectDB();

app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/posts', postsRouter)
app.use('/achievements', achievementsRouter)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).send(`Hello World! ${res.statusCode}`)
});

app.listen(port, () =>{
        logger.info(`Elevate Eats listening on port ${port}`);
});


