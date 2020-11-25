import { NextFunction, Request, Response } from 'express';
import { RouterConstants } from './../constants/router.constants';
export default function guardMiddleware( req: Request, res: Response, next: NextFunction ) {
  if ( !req.session.isAuth ) {
    return res.redirect( RouterConstants.AUTH );
  }

  next();
}
