const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto');


exports.generatejwt = (user) => {

   
    if (typeof user !== 'object' || Array.isArray(user)) {  
        throw new Error("The 'user' parameter must be a plain object.");  
    }  
   
    if (!process.env.ACCESS_TOKEN) {  
        throw new Error("ACCESS_TOKEN environment variable is not set.");  
    }  

    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
}

exports.sendmail = async(options) => {
    const transporter = nodemailer.createTransport({
    host: process.env.HOST, // Replace with your SMTP host
    port: process.env.PORT, // Common SMTP port
    auth: {
        user: process.env.SMTP_USER, // Your SMTP username
        pass: process.env.SMTP_PASS, // Your SMTP password
    },

   
});

console.log(process.env.HOST)

const mailOptions = {
    from: 'DENEROX',
    to: options.email,
    subject: options.subject,
    text: options.message, // Plain text version

};

await transporter.sendMail(mailOptions);

}


exports.generateFourDigitCode = () => {
    return crypto.randomInt(1000, 10000); // Range is inclusive of 1000 and exclusive of 10000
};