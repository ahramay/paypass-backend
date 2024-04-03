import nodemailer from 'nodemailer';

const {SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD } = process.env;

// Function to send email to super admin
export async function sendEmailToSuperAdmin(subject: string, text: string,userEmail: string) {
  try {
   // Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: SMTP_MAIL, // replace with your email
      pass: SMTP_PASSWORD, // replace with your email password
    },
  });

    // Define email options
    const mailOptions = {
      from: userEmail, // sender address
      to: 'ahmad.ramay4@gmail.com', // list of receivers
      subject: "onBording Request", // Subject line
      text: "User onBording Request approved it" // Plain text body
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent to super admin');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
