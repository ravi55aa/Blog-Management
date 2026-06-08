import {lazy} from 'react';

//Login
export const Register = lazy(() => import('./Auth/UserRegister'));
export const Login = lazy(() => import('./Auth/Login'));
export const LandingPage = lazy(() => import('./Auth/Landing'));

//Blog
export const Dashboard = lazy(() => import('./Blog/Dashboard'));
export const CreateBlog = lazy(() => import('./Blog/CreateBlog'));


