import { NextFunction, Request, Response } from 'express';
import { PathConstants } from '../constants/path.constants';
import { HTTPStatuses } from './../constants/http-statuses.constants';
import { ParamsConstants } from './../constants/params.constants';
export default function authMiddleware( req: Request, res: Response, next: NextFunction ) {
  res.status( HTTPStatuses.NOT_FOUND ).render( PathConstants.ERROR_PAGE, {
    title: ParamsConstants.PAGE_ERROR_HEADER
  } );
}
