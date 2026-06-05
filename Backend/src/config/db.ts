import mongoose from 'mongoose';
import { errorLogger, logger } from '../Utils/logger';

const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(
        process.env.MONGO_URI as string
        );

        logger.info("MongoDB Connected()");

    } catch (error) {
        errorLogger.error(error,'MongoDB Connection Error:');
        process.exit(1);
    }
};

export default connectDB;