import { Request, Response } from "express";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function GetHomePage (req: Request, res: Response): Promise<void> {
    try {
        return res.status(200).sendFile(path.join(__dirname,'../../public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

export async function GetSignInPage (req: Request, res: Response): Promise<void> {
    try {
        return res.status(200).sendFile(path.join(__dirname,'../../public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

export async function GetSigUpPage (req: Request, res: Response): Promise<void> {
    try {
        return res.status(200).sendFile(path.join(__dirname,'../../public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

export async function GetDashboardPage (req: Request, res: Response): Promise<void> {
    try {
        return res.status(200).sendFile(path.join(__dirname,'../../public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

export async function GetSearchPage (req: Request, res: Response): Promise<void> {
    try {
        return res.status(200).sendFile(path.join(__dirname,'../../public/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}



export async function Register(req: Request, res: Response): Promise<void>  {
    try {
        return void res.status(200).json({message: 'Logged in'})
    } catch (error) {
        return void res.status(500).json({error: 'Internal server error.'})
    }
}