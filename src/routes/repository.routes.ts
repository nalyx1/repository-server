import { Router } from 'express';
import RepositoryController from '../controllers/repository.controller';
import jwtAuth from '../middlewares/jwtAuthentication.middleware';

const routes = Router();

routes.use(jwtAuth);
routes.get('/users/:userId/repositories', RepositoryController.showUserRepository);
routes.get('/users/:userId/repositories/search', RepositoryController.find);
routes.post('/users/:userId/repositories', RepositoryController.create);
routes.post('/users/favorites', RepositoryController.showFavoritesRepositories);
routes.put('/users/:userId/repositories', RepositoryController.update);
routes.delete('/users/:userId/repositories/:repoId', RepositoryController.delete);

export default routes;
