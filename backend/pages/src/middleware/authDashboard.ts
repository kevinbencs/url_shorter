import pkg from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//const SECRET = process.env.JWT_SECRET || 'very_secret_key';

const { Request, Response, NextFunction } = pkg

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.signedCookies['user'];
    if (!token) {
      return res.status(302).redirect(`/signin`);
    }

    const tok = await prisma.token.findUnique({
      where: {
        token
      }
    });

    if (!tok || !tok.use) return res.status(302).redirect(`/signin`);

    const decoded = jwt.verify(token, SECRET);

    const user = await prisma.user.findUnique({
      where:{
        id: decoded.id
      }
    })

    if(!user) return res.status(302).redirect(`/signin`);

    next();

  } catch (error) {
    console.log(error)
    if (error.name === "TokenExpiredError") {
      return res.status(302).redirect(`/signin`);
    } else if (error.name === "JsonWebTokenError") {
      return res.status(302).redirect(`/signin`);
    } else if (error.name === "NotBeforeError") {
      return res.status(302).redirect(`/signin`);
    }

    return res.status(500).json({ 'error': 'Internal server error' });
  }



}