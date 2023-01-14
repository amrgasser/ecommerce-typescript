import Client from "../../database";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config()
const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

export type User = {
    id?: number,
    firstName: string,
    lastname: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const res = await conn.query(sql);

            conn.release();

            return res.rows;
        } catch (error) {
            throw new Error(`Cannot get all users\n ${error}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users where id=($1)`;
            const res = await conn.query(sql, [id]);

            conn.release();

            return res.rows[0];

        } catch (error) {
            throw new Error(`Cannot find user ${error}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS as string)
            )
            const result = await conn
                .query(sql, [u.firstName, u.lastname, hash])

            const user = result.rows[0];
            const createOrderSQL = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            await conn.query(createOrderSQL, [user.id, "active"]);

            conn.release()

            return user;
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstName} ${u.lastname}. Error: ${err}`)
        }
    }

    async authenticate(firstName: string, lastname: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)';
            const res = await conn.query(sql, [firstName, lastname]);
            conn.release();

            if (res.rows.length) {
                const user = res.rows[0];
                if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw new Error(`Unable to auth user ${error}`);
        }

    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async updatePassword(id: string, password: string): Promise<User> {
        try {
            const sql = `UPDATE users SET password=($1) WHERE id=($2)`
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [password, id])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not update password for user ${id}. Error: ${err}`)
        }
    }
}
