const nodemailer = require('nodemailer');
const config = require('../../config');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: config.smtpServer,
  port: config.emailPort,
  secure: true, // true for 465, false for other ports
  auth: {
      user: config.email, // generated ethereal user
      pass: config.password  // generated ethereal password
  }
});

module.exports = transporter;