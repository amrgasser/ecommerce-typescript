import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    NODE_ENV
} = process.env

let client: Pool = new Pool({
    host: POSTGRES_HOST,
    database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

console.log(NODE_ENV);

export default client