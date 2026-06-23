import mongoose from 'mongoose';
import { errorLogger, logger } from '../Utils/logger';
import env from './env.config';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI as string);

        logger.info('MongoDB Connected()');
    } catch (error) {
        errorLogger.error(error, 'MongoDB Connection Error:');
        process.exit(1);
    }
};

export default connectDB;
