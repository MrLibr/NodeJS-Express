import { Request, Response } from 'express';
import { ErrorTypes } from '../constants/error-message.constants';
import { ErrorMessages } from './../constants/error-message.constants';
import { RouterConstants } from './../constants/router.constants';

function notification( req: Request, types: ErrorTypes, message: ErrorMessages ): void {
  req.flash( types, message );
}

export function redirectTo( res: Response, redirectTo: RouterConstants | string ): void {
  res.redirect( redirectTo );
}

function loginErrorNotification( req: Request, message: ErrorMessages ): void {
  notification( req, ErrorTypes.LOGIN_ERROR, message );
}

export function successNotification( req: Request, message: ErrorMessages ): void {
  notification( req, ErrorTypes.SUCCESS_OPERATION, message );
}

function registerErrorNotification( req: Request, message: ErrorMessages ): void {
  notification( req, ErrorTypes.REGISTER_ERROR, message );
}

export function deleteErrorNotification( req: Request, message: ErrorMessages ): void {
  notification( req, ErrorTypes.DELETE_ERROR, message );
}

export function notificationWrongPassword( req: Request, res: Response ): void {
  loginErrorNotification( req, ErrorMessages.THIS_PASSWORD_WRONG );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}

export function notificationUserNotFound( req: Request, res: Response ): void {
  loginErrorNotification( req, ErrorMessages.THIS_USER_NOT_FOUND );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}

export function notificationErrorAuthorization( req: Request, res: Response ): void {
  loginErrorNotification( req, ErrorMessages.AUTHORIZATION );
  redirectTo( res, RouterConstants.AUTH );
}

export function notificationEmailBusy( req: Request, res: Response ): void {
  registerErrorNotification( req, ErrorMessages.THIS_EMAIL_BUSY );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_REGISTER );
}

export function notificationSuccessAddNewCourse( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.ADD_NEW_COURSE_SUCCESS );
  redirectTo( res, RouterConstants.ALL_COURSES );
}

export function notificationSuccessUpdateCourse( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.SUCCESS_UPDATE_COURSE );
  redirectTo( res, RouterConstants.ALL_COURSES );
}

export function notificationSuccessDeleteCourse( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.REMOVE_COURSE_SUCCESS );
  redirectTo( res, RouterConstants.ALL_COURSES );
}

export function notificationSuccessRegistry( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.CONGRATULATION_REGISTRY );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}

// export function notificationLogout( req: Request, res: Response ): void {
//   successNotification( req, ErrorMessages.LOGOUT );
//   redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
// }

export function notificationSuccessAddToCart( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.ADD_TO_CART );
  redirectTo( res, RouterConstants.CART );
}
