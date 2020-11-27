import nodemailer from 'nodemailer';
import { ConfigConstants } from '../constants/config.constants';

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
  const message: string = `
  <h1>Welcome To Our Website</h1>
  <p>We Was Successes Create Account On The ${ clientMail }</p>
  <hr/>
  <a href="${ ConfigConstants.BASE_SITE_URL }"><strong>Our Website</strong></a>
  `;

  sendMail( clientMail, ConfigConstants.SUPPORT_COMPANY_MAIL, 'Account Was Created Success', message );
}
