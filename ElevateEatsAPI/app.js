require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./routes/posts')
const achievementsRouter = require('./routes/achievements')
const logger = require('./utils/logger')

app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use('/posts', postsRouter)
app.use('/achievements', achievementsRouter)

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.status(200).send(`Hello World! ${res.statusCode}`)
})
app.listen(port, () =>{
        logger.info(`Elevate Eats listening on port ${port}`);
});


