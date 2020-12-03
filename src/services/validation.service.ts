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

export function catchErrors( req: Request, res: Response, path: RouterConstants | string ) {
  const errors = validationResult( req );

  return !errors.isEmpty()
    ? validationNotification( req, res, errors.array()[ 0 ].msg, path )
    : null;
}


export const registerValidation = [
  emailValidation(),
  passwordValidation(),
  equalsFiledValidation( ParamsConstants.REPEAT_PASSWORD, ParamsConstants.PASSWORD ),
  nameValidation()
];

export const loginValidation = [
  emailValidation(),
  passwordValidation()
];

export const recoveryValidation = [
  equalsFiledValidation( ParamsConstants.REPEAT_PASSWORD, ParamsConstants.PASSWORD ),
];
