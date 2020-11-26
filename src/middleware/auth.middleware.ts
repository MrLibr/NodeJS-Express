import { NextFunction, Request, Response } from 'express';
export default function authMiddleware( req: Request, res: Response, next: NextFunction ) {
  res.locals.isAuth = req.session.isAuth;
  next();
}
