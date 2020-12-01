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

export function loginErrorNotification( req: Request, message: ErrorMessages ): void {
  notification( req, ErrorTypes.LOGIN_ERROR, message );
}

export function errorNotification( req: Request, message: ErrorMessages ): void {
  notification( req, ErrorTypes.UNDEFINED_ERROR, message );
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
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}

export function notificationEmailBusy( req: Request, res: Response ): void {
  registerErrorNotification( req, ErrorMessages.THIS_EMAIL_BUSY );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_REGISTER );
}

export function notificationEmailNotFound( req: Request, res: Response ): void {
  loginErrorNotification( req, ErrorMessages.THIS_EMAIL_NOT_EXIST );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.RESET );
}

export function notificationSomethingWasWrong( req: Request, res: Response ): void {
  errorNotification( req, ErrorMessages.SOMETHING_WAS_WRONG );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.RESET );
}

export function notificationThisTokenNotExist( req: Request, res: Response ): void {
  errorNotification( req, ErrorMessages.TOKEN_NOT_EXIST );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}

export function notificationNotPermission( req: Request, res: Response ): void {
  errorNotification( req, ErrorMessages.HAVE_NOT_PERMISSION );
  redirectTo( res, RouterConstants.ALL_COURSES );
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

export function notificationSendResetPasswordMail( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.SEND_RESET_PASSWORD_MAIL );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}

export function notificationSuccessAddToCart( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.ADD_TO_CART );
  redirectTo( res, RouterConstants.CART );
}

export function notificationSuccessChangePassword( req: Request, res: Response ): void {
  successNotification( req, ErrorMessages.SUCCESS_CHANGE_PASSWORD );
  redirectTo( res, RouterConstants.AUTH + RouterConstants.HAS_LOGIN );
}
