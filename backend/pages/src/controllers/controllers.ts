import pkg from 'express';
//import { Request, Response } from "express";
import * as path from "path";
import process from "process";

const { Request, Response } = pkg


//GET request - Get Home page
export async function GetHomePage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'/frontend/pages/dist/home.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Sign in page
export async function GetSignInPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'/frontend/pages/dist/signin.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Sing up page
export async function GetSigUpPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'/frontend/pages/dist/signup.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Dashboard page
export async function GetDashboardPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'/frontend/dashboard/dist/index.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GET request - Get Search page
export async function GetSearchPage (req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'/frontend/pages/dist/search.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//GET request - Get 404
export async function GetNoRoute(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).sendFile(path.join(process.cwd(),'/frontend/pages/dist/404.html'))
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}



//GET request - Get 404
export async function NoRoute(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({code: 404, message: 'route not found'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

