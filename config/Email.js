import { transporter } from '../config/EmailConfig.js';
import { Verification_Email_Template } from './EmailTemplate.js';

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // receiver address
      subject: 'Verify Your Email', // Subject line
      text: 'Verify Your Email', // plain text body
      html: Verification_Email_Template.replace(
        '{verificationCode}',
        verificationCode
      ),
    });
    console.log('OTP sent Successfuly', response.messageId);
  } catch (error) {
    console.error('Error occurred: ', error);
    throw error;
  }
};
