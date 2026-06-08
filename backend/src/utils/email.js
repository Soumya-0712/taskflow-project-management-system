import { createRequire } from "module";
const require = createRequire(import.meta.url);
const _mailgen = require("mailgen");
const Mailgen = _mailgen.default || _mailgen;
import nodemailer from "nodemailer";
const mailGenerator = new Mailgen({
  theme: "default",
  product: { name: "Test", link: "https://test.com" },
});

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent);

  const emailHtml = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_GEN_SMTP_HOST,
    port: process.env.MAIL_GEN_SMTP_PORT,
    auth: {
      user: process.env.MAIL_GEN_SMTP_USERNAME,
      pass: process.env.MAIL_GEN_SMTP_PASSWORD,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email Service Failed silently.Make sure that you have provided your mailTrap credentials in the .env file",
    );
    console.error(error);
  }
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! Explore and Have Fun..",
      action: {
        instructions: "Click on the following button to verify your email",
        button: {
          color: "#22BC66",
          text: "Verify your Email",
          link: verificationUrl,
        },
      },
      outro:
        "Need Help,or have questions? Just reply to this email,we'd love to help.",
    },
  };
};

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      body: "Got a Request to reset the password of your account",
      action: {
        instruction:
          "Click on the following button/link to reset your password",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need Help,or have questions? Just reply to this email,we'd love to help.",
    },
  };
};

export {
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
  sendEmail,
};
