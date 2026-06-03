import {lazy} from 'react';

export const Register = lazy(() => import('./Auth/UserRegister'));
export const Login = lazy(() => import('./Auth/Login'));
export const LandingPage = lazy(() => import('./Auth/Landing'));