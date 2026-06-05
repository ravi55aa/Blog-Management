import session from 'express-session';

export const sessionConfig = () => {
    return session({
        secret: 'iam avi',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, //maxTime
        },
    });
};
