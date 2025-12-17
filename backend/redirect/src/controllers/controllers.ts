import { PrismaClient } from '@prisma/client';
import pkg from 'express';

const { Request, Response } = pkg
const prisma = new PrismaClient();


export const UrlRedirect = async (req: Request, res: Response) => {
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


        const target = req.params.url;


        if (target.includes('.') || req.originalUrl.includes('.')) {
            return void res.status(302).redirect('https://shorterurl123.duckdns.org/?info=no_url')
        }

        const url = await prisma.url.findUnique({
            where: {
                new_url: target
            }
        })

        const now = Number(new Date());

        if (!url || (url.once && url.viewer > 0) || (url.time > 0 && (now - Number(url.createdAt)) / 1000 / 6 > url.time)) {
            return void res.status(302).redirect(`https://shorterurl123.duckdns.org/?info=no_url`);
        }


        const red = await prisma.click.create({
            data: {
                new_url: target,
                ip: String(ip),
                user_agent: userAgent,
                referer: referer || '',
                language,
                accept,
            }
        })


        await prisma.url.update({
            where: {
                new_url: target
            },
            data: {
                viewer: url.viewer + 1
            }
        })


        return void res.status(302).redirect(`${url.real_url}`)
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}




export const NoUrlRedirect = (req: Request, res: Response) => {
    try {

        return void res.status(302).redirect('https://shorterurl123.duckdns.org/?info=no_url')

    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}