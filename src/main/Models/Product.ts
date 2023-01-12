import Client from '../../database'

export type Product = {
    id?: number,
    name: string,
    price: number
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products`;
            const res = await conn.query(sql);

            conn.release();

            return res.rows;

        } catch (error) {
            throw new Error(`could not fetch products ${error}`);
        }
    }
    async create(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`;

            const res = await conn.query(sql, [product.name, product.price]);

            conn.release();

            return res.rows[0];

        } catch (error) {
            throw new Error("Could not create product");

        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products where id=($1)`;
            const res = await conn.query(sql, [id]);

            conn.release();

            return res.rows[0];
        } catch (error) {
            throw new Error(`could not fetch product with id: ${id} ${error}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM products where id=($1)`;
            const res = await conn.query(sql, [id]);

            conn.release();

            return res.rows[0];
        } catch (error) {
            throw new Error(`could not delete product with id: ${id} ${error}`);
        }
    }
}