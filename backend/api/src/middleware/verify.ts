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
            return void res.status(401).json({ error: 'Please log in' })

        }
        else {
            const tok = await prisma.token.findUnique({
                where: {
                    token
                }
            });

            if (!tok || !tok.use) return void res.status(401).json({ error: 'Please log in' });

            const decoded = jwt.verify(token, SECRET)

            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                }
            })

            if (!user) {
                return void res.status(401).json({ error: 'Please log in' });
            }
            
            req.user = user;
            next();
        }
    } catch (error) {
        console.log(error)
        if (error.name === "TokenExpiredError") {
            return void res.status(401).json({ error: 'Please log in' });
        } else if (error.name === "JsonWebTokenError") {
            return void res.status(401).json({ error: 'Please log in' });
        } else if (error.name === "NotBeforeError") {
            return void res.status(401).json({ error: 'Please log in' });
        }

        return void res.status(500).json({ error: 'Internal server error' })
    }


}