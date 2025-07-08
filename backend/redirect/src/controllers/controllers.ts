import pkg from 'express';
//import { Request, Response } from "express";
import * as path from "path";
import process from "process";

const { Request, Response } = pkg

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