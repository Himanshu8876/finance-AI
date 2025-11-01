import nodemailer from "nodemailer";
import { Env } from "../config/env.config";

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender = `MyFinance <${Env.NODEMAILER_EMAIL}>`;

const transporter = nodemailer.createTransport({
  host: Env.NODEMAILER_HOST, 
  port: Number(Env.NODEMAILER_PORT) || 587,
  secure: Env.MAIL_SECURE,
  auth: {
    user: Env.NODEMAILER_EMAIL,
    pass: Env.NODEMAILER_PASS, 
  },
});

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) => {
  try {
    const info = await transporter.sendMail({
      from,
      to: Array.isArray(to) ? to.join(",") : to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
};
