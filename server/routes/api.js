const express = require('express');
const mailer = require('../nodemailer');
const User = require('mongoose').model('User');
const config = require('../../config');

const router = new express.Router();

// setup email data with unicode symbols
let mailOptions = {
  from: '"Almuerzos" <almuerzos@castrovaron.com>', // sender address
  to: 'josecastrovaron@gmail.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>' // html body
};

router.get('/dashboard', (req, res) => {
  console.log(req.decoded);
  res.json({
    message: "You're authorized to see this secret message."
  });
});

router.post('/date', (req, res) => {
  console.log(req.decoded);
  res.json({
    message: "You're authorized to see this secret message."
  });
});

// api endpoint to get user information
router.get('/me', (req, res) => {
  User.findById(req.userId, (userErr, user) => {
    if (userErr || !user) {
      return res.send(err);
    }
    res.json(user);
  });
});

router.get('/send', (req, res) => {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  res.json("yay");
});




module.exports = router;
