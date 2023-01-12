import { OrderStore, Order } from "../Models/Order";
import verifyToken from "../Middleware/verifyToken";
import express, { Router } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

const orderRoutes = Router();
const orderStore = new OrderStore();
const getIdFromHeader = (auth: string) => {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
    return decoded.user.id;
}

orderRoutes.get('/', verifyToken, async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = getIdFromHeader(req.headers.authorization as string)
        const obj = await orderStore.show(id);

        res.status(200).send(obj);


    } catch (error) {
        res.status(500).send('Server Error getting order' + error);
    }
})


orderRoutes.post('/', verifyToken, async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = getIdFromHeader(req.headers.authorization as string);

        const obj = await orderStore.insertItemInOrder(id, parseInt(req.body.product_id as string), parseInt(req.body.amount as string));

        if (obj != null) {
            res.status(201)
            res.json(obj);
            return;
        }
        res.status(404);
        res.send('Product not found');


    } catch (error) {
        res.status(500).send('Could not add product' + error);
    }
})


export default orderRoutes;