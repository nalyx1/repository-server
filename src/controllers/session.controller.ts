import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user.schema';
import { checkPassword } from '../services/auth';
import authConfig from '../config/auth';

class SessionController {
    async create(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const user = await User.findOne({ email });
            if (!user) {
                return response.status(401).json({ message: 'Email e/ou senha inválidos' });
            }

            const verifyPassword = await checkPassword(password, user.password);
            if (!verifyPassword) {
                return response.status(401).json({ message: 'Email e/ou senha inválidos' });
            }

            const { id } = user;
            return response.json({
                user: {
                    id,
                    email,
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new SessionController();
