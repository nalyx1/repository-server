import { json, Request, Response } from 'express';
import User from '../models/user.schema';
import { createPasswordHash } from '../services/auth';

class UserController {
    async showAll(request: Request, response: Response) {
        try {
            const users = await User.find();
            return response.status(200).json(users);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async showOne(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            return response.status(200).json(user);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { username, email, password } = request.body;

            if (!email) {
                return response.status(400).json({ message: 'Email não pode ser vazio' });
            }
            if (!username) {
                return response.status(400).json({ message: 'Username não pode ser vazio' });
            }
            if (!password) {
                return response.status(400).json({ message: 'Senha não pode ser vazio' });
            }

            const userNameVerify = await User.findOne({ username });
            if (userNameVerify) {
                return response.status(422).json({ message: `Username: ${username} já existe` });
            }

            const userEmail = await User.findOne({ email });
            if (userEmail) {
                return response.status(422).json({ message: `Email: ${email} já existe` });
            }

            const hashPassword = await createPasswordHash(password);

            const newUser = await User.create({
                username,
                email,
                password: hashPassword,
            });
            return response.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //TODO
    async update(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            const { username, email, password } = request.body;
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            const hashPassword = await createPasswordHash(password);
            await user.updateOne({ username, email, password: hashPassword });
            return response.status(200).json();
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            await user.deleteOne();
            return response.status(200).json('Usuário deletado com sucesso');
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUserRepositories(request: Request, response: Response) {
        try {
            const { userId, repoId } = request.params;
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            await user.updateOne({ $pull: { myRepositories: repoId } });
            return response.status(200).json();
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addUserFavorite(request: Request, response: Response) {
        try {
            const { userId, repoId } = request.params;
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            await user.updateOne({ $push: { favoritesRepositories: repoId } });
            return response.status(200).json();
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async removeUserFavorite(request: Request, response: Response) {
        try {
            const { userId, repoId } = request.params;
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).json();
            }

            await user.updateOne({ $pull: { favoritesRepositories: repoId } });
            return response.status(200).json();
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
