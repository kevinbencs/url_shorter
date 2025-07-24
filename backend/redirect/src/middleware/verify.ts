import pkg from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.ts';

//const SECRET = process.env.JWT_SECRET || 'very_secret_key';

const { Request, Response, NextFunction } = pkg

export async function Verify(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token


  
  if (!token) {
    if (req.url === `/dashboard`) return res.status(302).redirect(`/signin`);

    //if (req.params.url) return res.status(302).redirect('/');
    next();
  }
  else{
    jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      if (req.url === `/dashboard`) return res.status(302).redirect(`/signin`);

      //if (req.params.url) return res.status(302).redirect('/');
      next();
    }

    if((req.url === `/` || req.url === `/signin` || req.url === `/signup`)){
      return res.status(302).redirect(`/dashboard`)
    }

    // @ts-ignore
    req.user = user; // kiegészítjük a request objektumot
    next();
  });
  }

  
}