import { inject, injectable } from 'tsyringe';
import TYPES from '../config/DI/types';
import { IAuthService } from '../Interface/IServices/IAuthService';
import { Response, Request, NextFunction } from 'express';

@injectable()
class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private _authService: IAuthService
  ) {}

  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, resBody } = await this._authService.registerUser(req, res);

      res.status(status).json(resBody);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
