import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword: (password: string) => Promise<string> = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};
