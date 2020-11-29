import nodemailer from 'nodemailer';
import { ConfigConstants } from '../constants/config.constants';
import { RouterConstants } from './../constants/router.constants';

function sendMail( clientMail: string, workerMail: string, subject: string, message: string ): void {

  const mailer = nodemailer.createTransport( {
    service: ConfigConstants.SERVICE_NOTIFICATION_SERVICE,
    host: ConfigConstants.HOST_NOTIFICATION_SERVICE,
    auth: {
      user: ConfigConstants.MAIL_NOTIFICATION_SERVICE,
      pass: ConfigConstants.PASSWORD_NOTIFICATION_SERVICE
    }
  } );

  mailer.sendMail( {
    to: clientMail,
    from: workerMail,
    subject,
    html: message,

  } );
}

export function sendSuccessRegisterMail( clientMail: string ): void {
  const { BASE_SITE_URL, MAIL_NOTIFICATION_SERVICE } = ConfigConstants;

  const message: string = `
  <h1>Welcome To Our Website</h1>
  <p>We Was Successes Create Account On The ${ clientMail }</p>
  <hr/>
  <a href="${ BASE_SITE_URL }"><strong>Our Website</strong></a>
  `;

  sendMail( clientMail, MAIL_NOTIFICATION_SERVICE, 'Account Was Created Success', message );
}

export function sendResetPasswordMail( clientMail: string, token: string ): void {
  const { BASE_SITE_URL, MAIL_NOTIFICATION_SERVICE } = ConfigConstants;
  const { AUTH, RESET, ROOT } = RouterConstants;

  const message: string = `
  <h1>Do You Forget Password?</h1>
  <p>If You Don't Want Reset Password, Please Ignore This Message</p>
  <p>Else, Please Go To The Link Down:</p>
  <a href="${ BASE_SITE_URL }${ AUTH }${ RESET }${ ROOT }${ token }">Reset Your Password</a>
  <hr/>
  <a href="${ BASE_SITE_URL }"><strong>Our Website</strong></a>
  `;

  sendMail( clientMail, MAIL_NOTIFICATION_SERVICE, 'Recovery Permission', message );
}
