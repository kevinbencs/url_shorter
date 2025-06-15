//import { Response, Request, NextFunction } from "express";
import {z, ZodError} from 'zod'

import pkg from 'express';
const { Response, Request, NextFunction } = pkg;

export const validateData = (schema: z.ZodObject<any,any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError){
                const errorMessages = error.errors;
                return void res.status(400).json({failed: errorMessages})
            }
            else return void res.status(500).json({error: 'Internal server error'})
        }
    }
}