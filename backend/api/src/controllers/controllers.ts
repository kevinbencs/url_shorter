import pkg from 'express';
//import { Request, Response } from "express";
import * as path from "path";
import process from "process";

const { Request, Response } = pkg


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



//POST request - Add private links
export async function AddPrivateLinks(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//GEt request - Get private links
export async function GetPrivateLinks(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}

//DELETE request - Delete account
export async function DeleteAccount(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}


//PATCH request - Update password
export async function UpdatePassword(req: Request, res: Response): Promise<void> {
    try {
        return void res.status(200).json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return void res.status(500).json({error: 'Internal server error.'})
    }
}
