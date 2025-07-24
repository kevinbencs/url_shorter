import pkg from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config'
import { SECRET_COOKIE } from '../config/config';

const { Request, Response } = pkg
const prisma = new PrismaClient();

//GET request - Redirect
export async function UrlRedirect(req: Request, res: Response): Promise<void> {
    try {

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // User-Agent 
        const userAgent = req.headers['user-agent'];

        // Referer
        const referer = req.headers['referer'];

        // Language
        const language = req.headers['accept-language'];

        // 
        const accept = req.headers['accept'];


        const token = req.signedCookies['user'];
        const target = req.params.url;

        if (target.includes('.') || req.originalUrl.includes('.')) {
            return void res.status(302).redirect('/')
        }

        const url = await prisma.url.findUnique({
            where: {
                new_url: target
            }
        })

        const now = Number(new Date());

        if (!url || (url.once && url.viewer > 0) || (url.time > 0 && (now - Number(url.createdAt)) > url.time)) {
            return void res.status(302).redirect('/?info=no_url');
        }

        if (token) {
            const red = await prisma.click.create({
                data: {
                    new_url: target,
                    ip,
                    user_agent: userAgent,
                    referer,
                    language,
                    accept,
                    token
                }
            })
        }
        else {
            const red = await prisma.click.create({
                data: {
                    new_url: target,
                    ip,
                    user_agent: userAgent,
                    referer,
                    language,
                    accept,
                }
            })
        }


        if (url.private) {
            const tok = await prisma.token.findUnique({
                where: {
                    token
                }
            })

            if (!tok) return void res.status(302).redirect('/?info=private');

            const decoded = await jwt.verify(token, SECRET!)

            if (!decoded) return void res.status(302).redirect('/?info=private');

            const user = await prisma.user.findMany({
                where: {
                    email: decoded.email
                }
            })

            if (!user) return void res.status(302).redirect('/?info=private');

            const link = await prisma.anotherurl.findUnique({
                where:{
                    email: decoded.email,
                    new_url: target
                }
            })

            if(!link) return void res.status(302).redirect('/?info=private');
        }

        return void res.status(302).redirect(`${url.real_url}`)
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}