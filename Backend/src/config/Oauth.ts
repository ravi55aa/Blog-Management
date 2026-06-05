import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { IUser } from '../Interface/ISchemas/IUserSchema';
import userModel from '../Models/userModel';
import axios, { AxiosResponse } from 'axios';
import { GoogleTokenResponse, GoogleUserInfoResponse } from '../Interface/Other/oAuth';
import env from './env.config';
import { logger } from '../Utils/logger';
import { handleJwtTokensGenerator } from './jwt';
import { IJwtPayload } from '../Interface/Other/IPayloadJwt';
import { StatusCodes } from '../Constant/StatusCode';

dotenv.config();

const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:4000/google/callback';

export const handleOAuth = (req: Request, res: Response) => {
    const authUrl = new URL(GOOGLE_OAUTH_URL);

    authUrl.searchParams.set('client_id', CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'profile email');
    authUrl.searchParams.set('access_type', 'offline');

    res.redirect(authUrl.toString());
};

export const handleAuthCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    try {

        const tokenResponse: AxiosResponse<GoogleTokenResponse> = await axios.post(
            'https://oauth2.googleapis.com/token',

            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: REDIRECT_URI,
                code: String(code),

            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        const { access_token } = tokenResponse.data;
        //id_token

        const userInfo: AxiosResponse<GoogleUserInfoResponse> = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        const user = {
            googleId: userInfo.data.sub,
            email: userInfo.data.email,
            name: userInfo.data.name,
        };

        //req.session.user = user;
        let userInDB = await userModel.findOne({ googleId: user.googleId }).lean<IUser>();
        
        if (!userInDB) {
            const newGUser: Partial<IUser> = {
                name: user.name,
                googleId: user.googleId,
                password: user.googleId,
                email: user.email,
            };

            userInDB = await userModel.create(newGUser);
        }

        //--TOKEN GENERATION
        /*
            improper single responsibility principle    
            Move this part, 
            
        */
        const payload:IJwtPayload = {
            email:userInDB?.email,
            id:String(userInDB?._id),
            name:userInDB?.name
        }

        handleJwtTokensGenerator(payload,req,res);

        //--END TOKEN GENERATION

        res.redirect(`${env.FRONTEND_URL}/school/register`);

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {

            logger.error(
                `OAuth callback Axios error: ${JSON.stringify(error.response?.data)} - ${error.message}`
            );

        } else if (error instanceof Error) {

            logger.error(`OAuth callback error: ${error.message}`);

        } else {

            logger.error('Unknown OAuth callback error');
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Authentication failed. Please try again.');
    }
};
