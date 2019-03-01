import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import requestHelper from './requestHelper';
import winston from '../config/winston';

dotenv.config();

const baseUrl = 'https://the-politico.herokuapp.com';


/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
export default class Mailer {
/** This class send mail
 * @param {string} to
 * @param {string} message
 * @param {string} subject
 */
  static createMail({ to, message, subject }) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const mailOptions = {
      from: 'Politico-app <test@examle.com>',
      to,
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        winston.info(err);
      }
      winston.info(info);
    });
  }

  /**
   * Send password reset token to users email
   * @param {string} token
   * @param {string} email
   */
  static forgotPassword(res, statusCode, info, email) {
    const token = jwt.sign({ payload: email }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 1440,
    });
    const message = `
      <div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>You recently requested to reset your password. If this wasn't you, please ignore this mail.</p>
      <p>To reset your password</p>,
      <p>
      Click here: <a href='${baseUrl}/resetpassword.html?token=${token}'>
      Choose Password</a>
      </p>
      <p>Regards, Politico-app Team.</p>
      </div>`;

    requestHelper.success(res, statusCode, info, { data: token });
    winston.info(token);

    Mailer.createMail({
      to: email,
      subject: 'Reset forgotPassword',
      message,
    });
  }

  /**
   * Send success message if password reset is successful
   * @param {string} email
   */
  static resetPassword(res, statusCode, info, email) {
    const message = `
      <div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your password was reset succesfully.</p>
      <p>You can now <a href='${baseUrl}/login.html'>Login</a> to your account again.</p>
      </div>`;

    requestHelper.success(res, statusCode, info);

    return Mailer.createMail({
      to: email,
      subject: 'Password Reset Successful',
      message,
    });
  }
}
