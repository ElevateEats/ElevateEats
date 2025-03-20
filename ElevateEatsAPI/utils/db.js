import { MongoClient, ServerApiVersion } from "mongodb";
const logger = require('../utils/logger')

const URI = process.env.MONGODB_URI || "";
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    logger.info("Pinged your deployment. You successfully connected to ElevateEats!");
} catch (err) {
    logger.error(err);
}

let db = client.db("ElevateEatsAPI");

export default db;