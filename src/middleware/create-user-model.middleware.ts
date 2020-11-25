import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
export default async function createUserModelMiddleware( req: Request, res: Response, next: NextFunction ) {
  const { user } = req.session;
  req.user = user ? await User.findById( user._id ) : null;
  next();
}
