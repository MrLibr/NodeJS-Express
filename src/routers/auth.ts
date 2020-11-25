import express, { Request, Response } from 'express';
import { PathConstants } from '../constants/path.constants';
import User from '../models/user';
import { ParamsConstants } from './../constants/params.constants';
import { RouterConstants } from './../constants/router.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res.render( PathConstants.AUTH_FOLDER + PathConstants.LOGIN_PAGE, {
    title: ParamsConstants.AUTHORIZATION_PAGE,
    isLogin: true
  } );
} );

router.post( RouterConstants.LOGIN, async ( req: Request, res: Response ) => {
  req.session.user = await User.findById( '5fb7d139ad5c1462c95ad0a3' );
  req.session.isAuth = true;

  req.session.save( ( error ) => {
    if ( error ) {
      throw error;
    } else {
      res.redirect( RouterConstants.ROOT );
    }
  } );
} );

router.get( RouterConstants.LOGOUT, async ( req: Request, res: Response ) => {
  req.session.destroy( () => {
    res.redirect( RouterConstants.AUTH );
  } );
} );

export default router;
