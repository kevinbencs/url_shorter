import pkg from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.ts';


const { Request, Response, NextFunction } = pkg

export async function redDash(req: Request, res: Response, next: NextFunction) {

  try {
    const token = req.signedCookies['user'];

    if (token) {
      const tok = await prisma.token.findUnique({
        where: {
          token
        }
      });

      if (tok && tok.use) {
        const decoded = jwt.verify(token, SECRET);

        if (decoded) {

          const user = await prisma.user.findUnique({
            where: {
              id: decoded.id
            }
          })
          if (user) return res.status(302).redirect(`/dashboard`)
        }
      }
    }

    next();
  } catch (error) {
    console.log(error)
    if (error.name === "TokenExpiredError") {
      next();
    } else if (error.name === "JsonWebTokenError") {
      next();
    } else if (error.name === "NotBeforeError") {
      next();
    }
    else {
      return res.status(500).json({ 'error': 'Internal server error' });
    }

  }

}