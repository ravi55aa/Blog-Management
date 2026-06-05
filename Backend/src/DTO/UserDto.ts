import { Request } from 'express';
import { IUser } from '../Interface/ISchemas/IUserSchema';

export class UserDto {
  static registerUser(req: Request): Partial<IUser> {
    const { name, email, password } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
      throw new Error('Register credential is missing');
    }

    const userData = {
      name,
      email,
      password,
      googleId: password,
    };

    return userData;
  }
}
