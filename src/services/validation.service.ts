import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Error } from 'mongoose';
import { ErrorMessages } from './../constants/error-message.constants';
import { ParamsConstants } from './../constants/params.constants';
import { RouterConstants } from './../constants/router.constants';
import { validationNotification } from './notification.service';

export function emailValidation() {
  return body( ParamsConstants.EMAIL, ErrorMessages.CORRECT_EMAIL )
    .isEmail()
    .trim()
    .normalizeEmail();
}

export function passwordValidation() {
  return body( ParamsConstants.PASSWORD, ErrorMessages.CORRECT_PASSWORD )
    .trim()
    .isLength( { min: 6, max: 32 } )
    .isAlphanumeric();
}

export function registerPasswordValidation() {
  return body( ParamsConstants.REGISTER_PASSWORD, ErrorMessages.CORRECT_PASSWORD )
    .trim()
    .isLength( { min: 6, max: 32 } )
    .isAlphanumeric();
}

export function equalsFiledValidation( mainField: string, depField: string ) {
  return body( mainField )
    .trim()
    .custom( ( value: string, { req: Request } ): Error | boolean => {
      if ( value !== require.body[ depField ] ) {
        throw new Error( ErrorMessages.NOT_EQUAL_FIELDS );
      } else {
        return true;
      }
    } );
}

export function nameValidation() {
  return body( ParamsConstants.NAME, ErrorMessages.CORRECT_NAME )
    .trim()
    .isLength( { min: 3, max: 32 } );
}

export function titleValidation() {
  return body( ParamsConstants.TITLE, ErrorMessages.CORRECT_TITLE )
    .trim()
    .isLength( { min: 3 } );
}

export function priceValidation() {
  return body( ParamsConstants.PRICE, ErrorMessages.CORRECT_PRICE )
    .trim()
    .isNumeric();
}

export function descriptionValidation() {
  return body( ParamsConstants.DESCRIPTION, ErrorMessages.CORRECT_DESCRIPTION )
    .trim()
    .isLength( { min: 100, max: 3300 } );
}

export function urlValidation() {
  return body( ParamsConstants.IMG, ErrorMessages.CORRECT_IMG )
    .trim()
    .isURL();
}

export function catchErrors( req: Request, res: Response, path: RouterConstants | string ): boolean {
  const errors = validationResult( req );

  if ( errors.isEmpty() ) {
    return true;
  } else {
    validationNotification( req, res, errors.array()[ 0 ].msg, path );
    return false;
  }
}

export const registerValidation = [
  emailValidation(),
  registerPasswordValidation(),
  equalsFiledValidation( ParamsConstants.REPEAT_PASSWORD, ParamsConstants.PASSWORD ),
  nameValidation()
];

export const loginValidation = [
  emailValidation(),
  passwordValidation()
];

export const recoveryValidation = [
  passwordValidation(),
  equalsFiledValidation( ParamsConstants.REPEAT_PASSWORD, ParamsConstants.PASSWORD ),
];

export const coursesValidation = [
  titleValidation(),
  priceValidation(),
  descriptionValidation(),
  urlValidation()
];
