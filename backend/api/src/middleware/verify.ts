import pkg from 'express';
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const { Request, Response, NextFunction } = pkg

export const Verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.signedCookies['user'];

        if (!token) {
            return void req.status(401).json({ error: 'Please log in' })

        }
        else {
            const tok = await prisma.token.findUnique({
                token
            });

            if (!tok || !tok.use) return void req.status(401).json({ error: 'Please log in' });

            const decoded = jwt.verify(token, SECRET)

            req.user = decoded; // kiegészítjük a request objektumot
            next();
        }
    } catch (error) {
        console.log(error)
        return void req.status(500).json({ error: 'Internal server error' })
    }


}