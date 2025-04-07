import mongoose from "mongoose";
import logger from '../utils/logger.js'

const URI = process.env.MONGODB_URI || "";
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(URI)
        logger.info(`MongoDB Connected ${connect.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB ${error.message}`)
        process.exit(1)
    }
};

export default connectDB;
