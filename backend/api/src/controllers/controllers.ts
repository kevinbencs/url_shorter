import pkg from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config';
import { emailLimiter, ipLimiter } from '../middleware/rateLimit';
import { validate as isUuid } from 'uuid'

const { Request, Response } = pkg
const prisma = new PrismaClient();

interface graphData {
    date: string,
    viewer: number,
}

interface linkDescription {
    real_url: string,
    id: string,
    new_url: string,
    viewer: number,
    once: boolean,
    time: number,
    email: string,
    data: graphData[]
}



//POST request - Sing up
export async function Register(req: Request, res: Response): Promise<void> {
    try {

        const body = req.body as { email: string, password: string, name: string }

        const emailInDatab = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })

        if(emailInDatab) return void res.status(401).json({error: 'Email is used in another account.'})

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
            }
        })
        return void res.status(200).json({ message: 'Signed up' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}

//POST request - Sing in
export async function LogIn(req: Request, res: Response): Promise<void> {
    try {

        const body = req.body as { email: string, password: string };
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        try {
            await Promise.all([
                emailLimiter.consume(body.email),
                ipLimiter.consume(ip)
            ])

        } catch (error) {
            return void res.status(429).json({ error: 'Too many login attempts' });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })

        if (!user) return void res.status(401).json({ error: 'Invalid email or password. Please try again with the correct credentials' })

        const isPasswordValid = await bcrypt.compare(
            `${body.password}`,
            user.password
        );

        if (!isPasswordValid) return void res.status(401).json({ error: 'Invalid email or password. Please try again with the correct credentials' })
        let options = {
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        };

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

        const Tok = await prisma.token.create({
            data: {
                token,
                email: body.email
            }
        })

        await emailLimiter.delete(body.email)

        res.cookie("user", token, options);

        return void res.status(302).redirect('/dashboard')




    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}

//GET request - Log out
export async function LogOut(req: Request, res: Response): Promise<void> {
    try {

        const token = req.signedCookies['user'];

        if (!token) return void res.status(302).redirect('/');

        const Token = await prisma.token.update({
            where: {
                token
            },
            data: {
                use: false
            }
        })


        res.clearCookie("user",
            {
                signed: true,
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            }
        );
        return void res.status(302).redirect('/')
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}

//GET request - Get links
export async function GetLinks(req: Request, res: Response): Promise<void> {
    try {
        const email = req.user.email
        const urls = await prisma.url.findMany({
            where: {
                email
            }
        })

        if (urls) {
            const links: linkDescription[] = [];

            for (let i of urls) {

                const data = await prisma.$queryRaw`
                WITH dates AS (
                    SELECT generate_series(
                        (NOW() - interval '3 months')::date,
                        NOW()::date,
                        interval '1 day'
                    )::date AS day
                )
                SELECT 
                    to_char(d.day, 'YYYY/MM/DD') AS date,
                    COUNT(c.*)::int AS viewer
                FROM dates d
                LEFT JOIN "Click" c
                    ON c."createdAt"::date = d.day
                    AND c.new_url = ${i.new_url}
                GROUP BY d.day
                ORDER BY d.day;
                `


                links.push({
                    real_url: i.real_url,
                    id: i.id,
                    new_url: i.new_url,
                    viewer: i.viewer,
                    once: i.once,
                    time: i.time,
                    email: email,
                    data: [...data]
                })
            }


            return void res.status(200).json({ res: links })
        }

        return void res.status(200).json({ res: [] })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}

//POST request - Add links
export async function AddLinks(req: Request, res: Response): Promise<void> {
    try {
        const email = req.user.email;
        const body = req.body;

        if (body.newUrl === '' || typeof (body.newUrl) === 'undefined') {
            const length = 6;
            let result = '';
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }



            const link = await prisma.url.create({
                data: {
                    email,
                    new_url: result,
                    real_url: body.url,
                    time: body.min,
                    once: body.once
                }
            })
        }
        else {
            const link = await prisma.url.findUnique({
                where: {
                    new_url: body.newUrl
                }

            })

            if (link) {
                return void res.status(400).json({ error: `${body.newUrl} is used. Please select another url parameter or leave the input field blank.` })
            }


            const link2 = await prisma.url.create({
                data: {
                    email,
                    new_url: body.newUrl,
                    real_url: body.url,
                    time: body.min,
                    once: body.once
                }
            })
        }

        return void res.status(200).json({ message: 'Link added' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}


//POST request - Get link information
export async function GetLinkInformation(req: Request, res: Response): Promise<void> {
    try {
        const param = req.query.url;

        const urlParts = param.split('/');

        if (urlParts.length !== 1) {
            if (urlParts.length === 5) {
                const information = await prisma.url.findUnique({
                    where: {
                        new_url: urlParts[4],
                    }
                })

                if (information) {
                    return void res.status(200).json({ message: information.real_url })
                }
                return void res.status(404).json({ message: 'This url is not available.' })
            }
            else {
                return void res.status(404).json({ message: 'This url is not available.' })
            }
        }

        const information = await prisma.url.findUnique({
            where: {
                new_url: param,
            }
        })

        if (information) {
            return void res.status(200).json({ message: information.real_url })
        }
        return void res.status(404).json({ message: 'This url is not available.' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}


//DELETE request - Delete link
export async function DeleteLink(req: Request, res: Response): Promise<void> {
    try {
        const id = await req.params.id;

        if (!isUuid(id)) {
            return void res.status(400).json({ error: 'Invalid ID format.' });
        }

        const existing = await prisma.url.findUnique({ where: { id } });
        if (!existing) {
            return void res.status(404).json({ error: 'Link not found.' });
        }

        const del = await prisma.url.delete({
            where: {
                id
            }
        })


        return void res.status(200).json({ message: 'Link deleted' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}


//PATCH request - Update link
export async function UpdateLink(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const body = req.body

        if (!isUuid(id)) {
            return void res.status(400).json({ error: 'Invalid ID format.' });
        }

        const existing = await prisma.url.findUnique({ where: { id } });
        if (!existing) {
            return void res.status(404).json({ error: 'Link not found.' });
        }

        if (body.url !== "") {
            const up = await prisma.url.update({
                where: {
                    id
                },
                data: {
                    new_url: body.url,
                    time: body.min,
                    once: body.once
                }
            })
        }
        else {
            const up = await prisma.url.update({
                where: {
                    id
                },
                data: {
                    time: body.min,
                    once: body.once
                }
            })
        }



        return void res.status(200).json({ message: 'Link updated' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}




//DELETE request - Delete account
export async function DeleteAccount(req: Request, res: Response): Promise<void> {
    try {
        const user = req.user;

        const url = await prisma.url.deleteMany({
            where: {
                email: user.email
            }
        })

        const tok = await prisma.token.updateMany({
            where: {
                email: user.email
            },
            data: {
                use: false
            }
        })

        const acc = await prisma.user.delete({
            where: {
                email: user.email
            }
        })

        res.clearCookie("user");
        return void res.status(302).redirect('/')
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}


//PATCH request - Update password
export async function UpdatePassword(req: Request, res: Response): Promise<void> {
    try {
        const email = req.user.email;
        const body = req.body;
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const res2 = await prisma.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword,
            }
        })
        return void res.status(200).json({ message: 'Password changed' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}

//GET request - Get user name
export async function GetName(req: Request, res: Response): Promise<void> {
    try {
        const name = req.user.name

        return void res.status(200).json({ name });

    } catch (error) {
        console.log(error);
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}
