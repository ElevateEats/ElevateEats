require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./routes/posts')
const achievementsRouter = require('./routes/achievements')

const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);

app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use('/posts', postsRouter)
app.use('/achievements', achievementsRouter)

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.status(200).send(`Hello World! ${res.statusCode}`)
})
client.connect().then(r => {
    //logger.info(client.db("ElevateEats").command({ ping: 1 }));
    //logger.info("Pinged your deployment. You successfully connected to MongoDB!");
    app.listen(port, () =>{
        //logger.info(`Elevate Eats listening on port ${port}`)});
        console.log(client.db().runCursorCommand("show dbs"));
})});
// app.listen(port, () =>{
//     console.log(`Elevate Eats listening on port ${port}`)
// })
