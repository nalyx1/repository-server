import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export const createPasswordHash = async (password: string) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        return bcrypt.hash(password, salt);
    });
};

export const checkPassword = async (userPassword: string, password: string) => {
    return bcrypt.compare(userPassword, password);
};
