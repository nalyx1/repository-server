import { Request, Response } from 'express';
import Repository from '../models/repository.schema';
import User from '../models/user.schema';

class RepositoryController {
    async showUserRepository(request: Request, response: Response) {
        try {
            const { userId } = request.params;

            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            const repositories = await Repository.find({ userId });
            return response.status(200).json(repositories);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async showFavoritesRepositories(request: Request, response: Response) {
        try {
            const { repositoryId } = request.body;

            const favoritesRepositories = await Repository.find({ _id: { $in: repositoryId } });

            return response.status(200).json(favoritesRepositories);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async find(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            const { q } = request.query;

            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            let query = { name: { $regex: q } };

            const repositories = await Repository.find({
                ...query,
                privateRepository: false,
            });

            if (repositories.length === 0) {
                return response.status(200).json();
            }
            return response.status(200).json(repositories);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            const { name, url, description, privateRepository } = request.body;

            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            if (!name) {
                return response.status(400).json({ message: 'Nome do repositório não pode ser vazio' });
            }
            if (!url) {
                return response.status(400).json({ message: 'URL do repositório não pode ser vazio' });
            }
            if (!description) {
                return response.status(400).json({ message: 'Descrição do repositório não pode ser vazio' });
            }
            if (privateRepository === undefined) {
                return response.status(400).json({ message: 'Repositório privado não pode ser vazio' });
            }

            const repository = await Repository.findOne({ name, userId });
            if (repository) {
                return response.status(400).json({ message: 'Nome do repositório já existe' });
            }

            const newRepository = await Repository.create({
                owner: user.username,
                name,
                url,
                description,
                privateRepository,
                userId,
            });

            await user.updateOne({ $push: { myRepositories: newRepository._id } });

            return response.status(201).json(newRepository);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //TODO
    async update(request: Request, response: Response) {
        try {
            return response.status(200).json({ message: 'Repositório atualizado com sucesso' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { userId, repoId } = request.params;

            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            const repository = await Repository.findOne({ _id: repoId, userId });
            if (!repository) {
                return response.status(400).json({ message: 'Repositório não existe' });
            }

            await repository.deleteOne();
            return response.status(200).json({ message: 'Repositório deletado com sucesso' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new RepositoryController();
