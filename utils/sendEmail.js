require("dotenv").config();
const nodemailer = require("nodemailer")

const SendMail = async(emails)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        secure:false,
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
        },
        tls: {
            rejectUnauthorized: true
        }
      });
    
      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: emails,
        subject:"Cron job test mail",
        html:"<p> This is a cron job testing mail </p>",
      };

     transporter.sendMail(mailOptions);
        
}

module.exports = SendMail