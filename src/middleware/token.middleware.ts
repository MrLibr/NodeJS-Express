import { NextFunction, Request, Response } from 'express';
export default function tokenMiddleware( req: Request, res: Response, next: NextFunction ) {
  res.locals.csrf = req.csrfToken();
  next();
}
