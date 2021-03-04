const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    //1)Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    //2)Define the mail options
    const mailOptions = {
        from: 'Henish Shah <h.s@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
        
        //html:
    }
    //3)Actually send Mail
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;