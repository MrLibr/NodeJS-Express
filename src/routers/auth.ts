import bcryptjs from 'bcryptjs';
import express, { Request, Response } from 'express';
import { ConfigConstants } from '../constants/config.constants';
import { PathConstants } from '../constants/path.constants';
import User from '../models/user';
import { sendSuccessRegisterMail } from '../services/mail.service';
import { notificationEmailBusy, notificationLogout, notificationSuccessRegistry, notificationUserNotFound, notificationWrongPassword } from '../services/notification.service';
import { ErrorTypes } from './../constants/error-message.constants';
import { ParamsConstants } from './../constants/params.constants';
import { RouterConstants } from './../constants/router.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res.render( PathConstants.AUTH_FOLDER + PathConstants.LOGIN_PAGE, {
    title: ParamsConstants.AUTHORIZATION_PAGE,
    isLogin: true,
    loginError: req.flash( ErrorTypes.LOGIN_ERROR ),
    registerError: req.flash( ErrorTypes.REGISTER_ERROR ),
    successOperation: req.flash( ErrorTypes.SUCCESS_OPERATION )
  } );
} );

router.post( RouterConstants.LOGIN, async ( req: Request, res: Response ) => {
  try {
    const { email, password } = req.body;
    const condidate = await User.findOne( { email } );

    if ( condidate ) {
      const isPasswordSame: boolean = await bcryptjs.compare( password, condidate.password );

      if ( isPasswordSame ) {
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
        notificationWrongPassword( req, res );
      }

    } else {
      notificationUserNotFound( req, res );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

router.get( RouterConstants.LOGOUT, async ( req: Request, res: Response ) => {
  req.session.destroy( () => {
    notificationLogout( req, res );
  } );
} );

router.post( RouterConstants.REGISTER, async ( req: Request, res: Response ) => {
  try {
    const { email, name, password, repeatPassword } = req.body;
    const condidate = await User.findOne( { email } );

    if ( condidate ) {
      notificationEmailBusy( req, res );
    } else {
      const cryptedPassword: string = await bcryptjs.hash( password, +ConfigConstants.PASSWORD_SECRET_KEY );
      const newUser = new User( { email, name, password: cryptedPassword, cart: { items: [] } } );
      await newUser.save();

      await sendSuccessRegisterMail( email );
      notificationSuccessRegistry( req, res );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
