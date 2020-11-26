import bcryptjs from 'bcryptjs';
import express, { Request, Response } from 'express';
import { ConfigConstants } from '../constants/config.constants';
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
  try {
    const { email, password } = req.body;
    const condidate = await User.findOne( { email } );
    const isSame: boolean = await bcryptjs.compare( password, condidate.password );

    if ( condidate && isSame ) {
      req.session.user = condidate;
      req.session.isAuth = true;

      req.session.save( ( error ) => {
        if ( error ) {
          throw error;
        } else {
          res.redirect( RouterConstants.ROOT );
        }
      } );
    } else {
      res.redirect( RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

router.get( RouterConstants.LOGOUT, async ( req: Request, res: Response ) => {
  req.session.destroy( () => {
    res.redirect( RouterConstants.AUTH );
  } );
} );

router.post( RouterConstants.REGISTER, async ( req: Request, res: Response ) => {
  try {
    const { email, name, password, repeatPassword } = req.body;
    const condidate = await User.findOne( { email } );

    if ( condidate ) {
      res.redirect( RouterConstants.AUTH + RouterConstants.HAS_REGISTER );
    } else {
      const cryptedPassword: string = await bcryptjs.hash( password, ConfigConstants.COUNT_SALT );
      const newUser = new User( { email, name, password: cryptedPassword, cart: { items: [] } } );
      await newUser.save();
      res.redirect( RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
