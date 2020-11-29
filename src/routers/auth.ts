import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import express, { Request, Response } from 'express';
import { ConfigConstants } from '../constants/config.constants';
import User from '../models/user';
import { sendResetPasswordMail, sendSuccessRegisterMail } from '../services/mail.service';
import { notificationEmailBusy, notificationEmailNotFound, notificationSendResetPasswordMail, notificationSomethingWasWrong, notificationSuccessRegistry, notificationUserNotFound, notificationWrongPassword, redirectTo, successNotification } from '../services/notification.service';
import { ErrorMessages, ErrorTypes } from './../constants/error-message.constants';
import { ParamsConstants } from './../constants/params.constants';
import { PathConstants } from './../constants/path.constants';
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
  successNotification( req, ErrorMessages.LOGOUT );
  req.session.destroy( () => redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN ) );
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

      sendSuccessRegisterMail( email );
      notificationSuccessRegistry( req, res );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

router.get( RouterConstants.RESET, ( req: Request, res: Response ) => {
  res.render( PathConstants.AUTH_FOLDER + PathConstants.RESET_PAGE, {
    title: ParamsConstants.RESET_PAGE,
    loginError: req.flash( ErrorTypes.LOGIN_ERROR ),
    undefinedError: req.flash( ErrorTypes.UNDEFINED_ERROR )
  } );
} );

router.post( RouterConstants.RESET, async ( req: Request, res: Response ) => {
  try {
    const { email } = req.body;
    const condidate = await User.findOne( { email } );

    if ( condidate ) {

      crypto.randomBytes( +ConfigConstants.RESET_SIZE_KEY, ( error: Error | null, buffer: Buffer ) => {
        if ( error ) {
          notificationSomethingWasWrong( req, res );
        }

        const token: string = buffer.toString( 'hex' );

        condidate.resetToken = token;
        condidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        condidate.save();

        sendResetPasswordMail( condidate.email, token );
        notificationSendResetPasswordMail( req, res );
      } );
    } else {
      notificationEmailNotFound( req, res );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
