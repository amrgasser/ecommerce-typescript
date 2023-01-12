import Client from "../../database";
import { Product } from "./Product";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'
import { User } from "./User";

dotenv.config()

export type Order = {
    id?: number,
    products?: Object[],
    status?: string
}

export class OrderStore {
    async show(userid: number): Promise<Order> {
        try {

            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const res = await conn.query(sql, [userid, "active"]);
            const order: Order = {
                status: res.rows[0].status,
                products: []
            };
            if (res.rows) {
                const orderid = res.rows[0].id;
                const joinSQL = 'SELECT * FROM orders_products LEFT JOIN products ON product_id=products.id WHERE order_id=($1)';
                const allProductIDs = await conn.query(joinSQL, [orderid]);
                order.products = allProductIDs.rows.map((row) => {
                    const { product_id, name, price, amount } = row;
                    return { product_id, name, price, amount }
                })
            }

            conn.release();
            return order;

        } catch (error) {
            throw new Error('Could not fetch current order' + error);
        }
    }

    async insertItemInOrder(user_id: number, product_id: number, amount: number): Promise<Object | null> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders_products (order_id, product_id, amount) VALUES ($1, $2, $3) RETURNING *';
            //check if product exists
            const productRows = await conn.query('SELECT * FROM products where id=($1)', [product_id]);
            //get user's current order_id
            const userOrder = await conn.query('SELECT * FROM orders WHERE user_id=($1) AND status=($2)', [user_id, "active"]);
            const order_id = userOrder.rows[0].id;

            if (productRows) {
                const res = await conn.query(sql, [order_id, productRows.rows[0].id, amount]);
                console.log(res.rows);

                conn.release();
                return res.rows[0];
            }

            conn.release();

            return null
        } catch (error) {
            throw new Error('Could not add product to current order' + error);
        }
    }
}
