const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//this is used to make sending emails to the attached admin email address easy by using the nodemailer module
//makes receiving emails from users filling out a form especially easy
//gives easy access to attached email by sending the email messages through the backend
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email, // your email address to send email from
    pass: process.env.password // your gmail account password
  }
});

module.exports = transporter;