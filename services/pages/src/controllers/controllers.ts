import pkg from 'express';
//import { Request, Response } from "express";
import * as path from "path";
import process from "process";
import { fileURLToPath } from "url";

const { Request, Response } = pkg

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//GET request - Get Home page
export async function GetHomePage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(__dirname,'../../public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Sign in page
export async function GetSignInPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(__dirname,'../../public/signin.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Sing up page
export async function GetSigUpPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(__dirname,'../../public/signup.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Dashboard page
export async function GetDashboardPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(__dirname,'../../public/dashboard/dashboard/dist/index.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Search page
export async function GetSearchPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'../../public/search.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


