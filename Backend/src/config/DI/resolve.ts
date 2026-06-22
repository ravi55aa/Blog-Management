import { container } from 'tsyringe';
import AuthController from '../../Controllers/AuthController';
import BlogController from '../../Controllers/BlogController';

export const authController = container.resolve(AuthController);
export const blogController = container.resolve(BlogController);
