import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const GMAIL_USERNAME = process.env.GMAIL_USERNAME;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

export async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_USERNAME,
            pass: GMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: GMAIL_USERNAME,
        to: to,
        subject: subject,
        html: text
    };

    await transporter.sendMail(mailOptions);
}
