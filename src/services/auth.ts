import * as bcrypt from 'bcryptjs';

export const createPasswordHash = async (password: string) => {
    return bcrypt.hash(password, 8);
};

export const checkPassword = async (userPassword: string, password: string) => {
    return bcrypt.compare(userPassword, password);
};
