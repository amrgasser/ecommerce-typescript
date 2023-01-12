import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../Models/User';
import dotenv from 'dotenv'

dotenv.config()

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    try {
        const tokenSecret = process.env.TOKEN_SECRET as string;
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, tokenSecret);
        return next();
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
}
export default verifyToken;