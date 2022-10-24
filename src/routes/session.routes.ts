import { Router } from 'express';
import SessionController from '../controllers/session.controller';

const routes = Router();

routes.post('/sessions', SessionController.create);

export default routes;
