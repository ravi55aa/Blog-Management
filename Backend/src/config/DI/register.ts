import { container } from 'tsyringe';
import TYPES from './types';

import Authservice from '../../Services/AuthService';
import AuthRepository from '../../Repository/AuthRepository';
import BlogService from '../../Services/BlogService';
import { BlogRepository } from '../../Repository/BlogRepository'; 

container.registerSingleton(TYPES.AuthService, Authservice);
container.registerSingleton(TYPES.AuthRepository, AuthRepository);

container.registerSingleton(TYPES.BlogService, BlogService);
container.registerSingleton(TYPES.BlogRepository, BlogRepository);
