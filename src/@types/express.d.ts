import { Request } from 'express';

interface IGetUserAuthInfoRequest extends Request {
    userId: string;
}

export default IGetUserAuthInfoRequest;
