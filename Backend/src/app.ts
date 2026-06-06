/// <reference path="./types/express-session.d.ts" />

import 'reflect-metadata';
import './config/DI/register';

import express, { Request, Response, NextFunction } from 'express';
const app = express();
import { logger } from './Utils/logger';
import { StatusCodes } from './Constant/StatusCode';
import handleErrorsMiddleware from './Middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sessionConfig, env,connectDB } from './config';
import { OauthRouter,authRouter } from './Routes';

//application middlewares
app.use(
    cors({
        origin: 'http://localhost:5173', //import form env
        credentials: true,
        methods:["GET","POST","PUT","PATCH","DELETE"]
    })
);

app.use(cookieParser()); //req.cookie parser
app.use(sessionConfig());
app.use(express.json()); // read req.body
app.use(express.urlencoded({ extended: true })); //read form data

//global router
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info({ method: req.method, path: req.path },
        "Health Check"
    );
    console.log(process.env.NODE_ENV);
    next();
});


//DB
connectDB();


/*ROUTES*/
app.use("/google",OauthRouter);
app.use("/auth",authRouter);


/*health check*/
app.get('/health', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'Health okay',
        success: true,
        data: null,
        error: null,
    });
});

//error Handler
app.use(handleErrorsMiddleware);

app.listen(env.PORT ,() => { //import origin from env
    console.log(`http://localhost:${env.PORT}`);
});
