import dotenv from 'dotenv';

dotenv.config();

const env = {
    PORT: process.env.PORT || 4000,
    
    NODE_ENV: process.env.NODE_ENV || '',
    
    MONGO_URI: process.env.MONGO_URI || '',
    
    JWT_SECRET: process.env.JWT_SECRET || '',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
    
    FRONTEND_URL: process.env.FRONTEND_URL || '',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
};

Object.freeze(env);

export default env;
