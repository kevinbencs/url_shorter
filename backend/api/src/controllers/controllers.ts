import pkg from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config';

const { Request, Response } = pkg
const prisma = new PrismaClient();

//POST request - Sing up
export async function Register(req: Request, res: Response): Promise<void> {
    try {
        
        const body = req.body as { email: string, password: string, name: string }

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
        const body = req.body as { email: string, password: string }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })
        console.log(body);
        console.log(user);
        console.log(2)
        if (!user) return void res.status(401).json({ error: 'Invalid email or password. Please try again with the correct credentials' })
            console.log(3)
        const isPasswordValid = await bcrypt.compare(
            `${body.password}`,
            user.password
        );

        if (!isPasswordValid) return void res.status(401).json({ error: 'Invalid email or password. Please try again with the correct credentials' })
            console.log(4)
        let options = {
            signed: true,
            httpOnly: true, // The cookie is only accessible by the web server
            secure: true,
            sameSite: 'lax'
        };

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" } );

        const Tok = await prisma.token.create({
            data: {
                token,
            }
        })

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
        const urls = await prisma.Url.findMany({
            where: {
                email
            }
        })
        return void res.status(200).json({ res: urls })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}

//POST request - Add links
export async function AddLinks(req: Request, res: Response): Promise<void> {
    try {
        const email = req.user.email;
        const body =  req.body;

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
                real_url: body.real_url,
                time: body.time,
                once: body.once
            }
        })
        return void res.status(200).json({ message: 'Link added' })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}


//POST request - Get link information
export async function GetLinkInformation(req: Request, res: Response): Promise<void> {
    try {
        const param = req.param;

        const information = await prisma.url.findUnique({
            where: {
                new_url: param,
            }
        })

        if (information.private) {
            return void res.status(200).json({ message: 'Private url' })
        }
        return void res.status(200).json({ message: information.real_url })
    } catch (error) {
        console.log(error)
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}


//DELETE request - Delete link
export async function DeleteLink(req: Request, res: Response): Promise<void> {
    try {
        const email = req.user.email;
        const id = await req.params;

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

        const email = req.user.email;
        const id = await req.params;
        const body = req.body

        const up = await prisma.url.update({
            where: {
                id
            },
            data: {
                new_url: body.new_url,
                real_url: body.real_url,
                private: body.private,
                time: body.time,
                once: body.once
            }
        })

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
        const token = req.token;

        const not_own = await prisma.anotherurl.delete({
            where: {
                email: user.email
            }
        })

        const url = await prisma.url.delete({
            where: {
                email: user.email
            }
        })

        const tok = await prisma.token.update({
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
        const del = await prisma.user.update({
            where: {
                email
            },
            data: {
                password: body.password,
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

        return void res.status(200).json({name});

    } catch (error) {
        console.log(error);
        return void res.status(500).json({ error: 'Internal server error.' })
    }
}
