import express, { Request, Response } from 'express';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import { ParamsConstants } from './../constants/params.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res.render( PathConstants.AUTH_FOLDER + PathConstants.LOGIN_PAGE, {
    title: ParamsConstants.AUTHORIZATION_PAGE,
    isLogin: true
  } );
} );

export default router;
