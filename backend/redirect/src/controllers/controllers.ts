import pkg from 'express';
import { PrismaClient } from '@prisma/client';

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
        
        if (!url || (url.once && url.viewer > 0) || (url.time > 0 && (now - Number(url.createdAt))/1000/6 > url.time)) {
            return void res.status(302).redirect(`/?info=no_url`);
        }


        if (token) {
            const red = await prisma.click.create({
                data: {
                    new_url: target,
                    ip,
                    user_agent: userAgent,
                    referer: referer || '',
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
                    referer: referer || '',
                    language,
                    accept,
                }
            })
        }


        await prisma.url.update({
            where:{
                new_url: target
            },
            data:{
                viewer: url.viewer + 1
            }
        })


        return void res.status(302).redirect(`${url.real_url}`)
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}