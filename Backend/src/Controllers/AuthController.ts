import { inject, injectable } from 'tsyringe';
import TYPES from '../config/DI/types';
import { IAuthService } from '../Interface/IServices/IAuthService';
import { Response, Request, NextFunction } from 'express';
import { IUser } from '../Interface/ISchemas/IUserSchema';
import { IJwtPayload } from '../Interface/Other/IPayloadJwt';
import { handleJwtTokensGenerator } from '../config';
import { StatusCodes } from '../Constant/StatusCode';

@injectable()
class AuthController {
    constructor(
        @inject(TYPES.AuthService)
        private _authService: IAuthService
    ) {}

    public async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, responseBody } = await this._authService.userRegister(req, res);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body as { email: string; password: string };

            const { status, responseBody } = await this._authService.userLogin({ email, password });

            const user: IUser = responseBody.data;

            const payload: IJwtPayload = {
                id: String(user._id),
                email: user.email,
                name: user.name,
            };

            handleJwtTokensGenerator(payload, req, res);
            //responseBody.data={} don't send credentials to frontend;

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async currentUser(
        req: Request,
        res: Response
    ) {

        return res.status(StatusCodes.OK).json({
            success: true,
            user: req.user,
        });

    }
}

export default AuthController;
