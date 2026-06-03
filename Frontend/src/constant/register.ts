import type { authField } from "../types/authField.type";

export const UserRegisterFields : authField[] = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' }
];

export const LoginFields: authField[] = [
    { name: 'email', type: 'email', placeholder: 'Email Address' },
    { name: 'password', type: 'password', placeholder: 'Password' },
];