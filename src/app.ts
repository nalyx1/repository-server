import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import repositoryRoutes from './routes/repository.routes';
import sessionRoutes from './routes/session.routes';
import './database/index';

class App {
    public server: Express;
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        this.server.use(sessionRoutes);
        this.server.use(userRoutes);
        this.server.use(repositoryRoutes);
    }
}

export default new App().server;
