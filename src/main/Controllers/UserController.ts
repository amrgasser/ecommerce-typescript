import express, { Router } from 'express'
import { UserStore } from '../Models/User'
import verifyToken from '../Middleware/verifyToken';
import jwt from 'jsonwebtoken'
import { User } from '../Models/User';

const userStore = new UserStore();
const userRoutes = Router();


userRoutes.get('/', verifyToken, async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let users: User[] = await userStore.index();
        res.json(users);
    } catch (e) {
        res.status(500).send(e);
    }
})


userRoutes.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { firstName, lastname, password } = req.body;
        const user: User = {
            firstName,
            lastname,
            password
        }

        const newUser = await userStore.create(user);

        const token = jwt.sign(
            {
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastname: newUser.lastname
                }
            },
            process.env.TOKEN_SECRET as string
        );
        res.status(201).send(token)
    } catch (error) {
        console.log(error);

        res.status(500).send(error)
    }
})

userRoutes.delete('/:id', verifyToken, async (req: express.Request, res: express.Response): Promise<void> => {
    const id: number = parseInt(req.params.id as string);

    if (id) {
        try {
            const del: User = await userStore.delete(id);
            if (del) {
                res.sendStatus(204);
            } else {
                res.status(404).send('User not found');
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
})

export default userRoutes;




