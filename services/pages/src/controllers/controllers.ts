import pkg from 'express';
//import { Request, Response } from "express";
import * as path from "path";
import process from "process";

const { Request, Response } = pkg


//GET request - Get Home page
export async function GetHomePage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'./public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Sign in page
export async function GetSignInPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'./public/signin.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Sing up page
export async function GetSigUpPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'./public/signup.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Dashboard page
export async function GetDashboardPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'./public/dashboard.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Search page
export async function GetSearchPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'./public/search.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//POST request - Sing up
export async function Register(req: Request, res: Response): Promise<void>  {
    try {
        const body = await req.body
        console.log(body)
        return void res.status(200).json({message: 'Logged in'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//POST request - Sing in
export async function LogIn(req: Request, res: Response): Promise<void>  {
    try {
        return void res.status(200).json({message: 'Logged in'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Log out
export async function LogOut(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get links
export async function GetLinks(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//POST request - Add links
export async function AddLinks(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//POST request - Get link information
export async function GetLinkInformation(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//DELETE request - Delete link
export async function DeleteLink(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//PATCH request - Update link
export async function UpdateLink(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//GET request - Redirect
export async function UrlRedirect(req: Request, res: Response): Promise<void> {
    try {

        const target = req.params.url;
        if (target.includes('.') || req.originalUrl.includes('.')) {
            return void res.status(404).send('Not found');
        }


        return void res.status(302).redirect('/')
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}