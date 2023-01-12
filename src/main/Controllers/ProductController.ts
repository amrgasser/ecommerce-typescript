import express, { Router } from 'express';
import verifyToken from '../Middleware/verifyToken';
import { Product, ProductStore } from '../Models/Product';

const productStore = new ProductStore();
const productRoutes = Router();

productRoutes.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let products: Product[] = await productStore.index();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoutes.get('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let id: number = parseInt(req.params.id);
        let product: Product = await productStore.show(id);
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoutes.post('/', verifyToken, async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, price } = req.body
        const product: Product = {
            name,
            price
        }

        const newProduct = await productStore.create(product);
        console.log(newProduct);


        res.status(201);
        res.json(newProduct);
    } catch (error) {
        res.status(500).send(error);
    }
})


export default productRoutes;