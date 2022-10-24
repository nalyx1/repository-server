import { Router } from 'express';
import UserController from '../controllers/user.controller';
import jwtAuth from '../middlewares/jwtAuthentication.middleware';

const routes = Router();

routes.post('/users', UserController.create);

routes.use(jwtAuth);

routes.get('/users', UserController.showAll);
routes.get('/users/:userId', UserController.showOne);
routes.put('/users/:userId', UserController.update);
routes.delete('/users/:userId', UserController.delete);
routes.put('/users/:userId/repositories/:repoId', UserController.updateUserRepositories);
routes.put('/users/:userId/repositories/favorite/:repoId', UserController.addUserFavorite);
routes.put('/users/:userId/repositories/unfavorite/:repoId', UserController.removeUserFavorite);

export default routes;
