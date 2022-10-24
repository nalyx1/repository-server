import { Response, NextFunction } from 'express';
import IGetUserAuthInfoRequest from '../@types/express';
import * as jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const jwtAuth: any = async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ error: 'Token was not provided.' });
    }

    const [authType, token] = authorization.split(' ');
    if (authType !== 'Bearer' || !token) {
        return response.status(401).json({ error: 'Invalid Token.' });
    }

    try {
        if (authConfig.secret) {
            const decoded = jwt.verify(token, authConfig.secret) as any;
            request.userId = decoded.id;

            return next();
        }
    } catch (error) {
        return response.status(401).json({ error: 'Invalid Token.' });
    }
};

export default jwtAuth;
