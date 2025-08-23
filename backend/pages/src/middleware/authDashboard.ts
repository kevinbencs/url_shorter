import pkg from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.ts';

//const SECRET = process.env.JWT_SECRET || 'very_secret_key';

const { Request, Response, NextFunction } = pkg

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {

  const token = req.signedCookies['user'];
  if (!token) {
    return res.status(302).redirect(`/signin`);

  }
  else {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
         return res.status(302).redirect(`/signin`);
      }
      next();
    });
  }

}