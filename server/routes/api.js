const express = require('express');
const mailer = require('../nodemailer');
const User = require('../models/user');
const Lunch = require('../models/lunch');
const config = require('../../config');

const router = new express.Router();

function validateLunchForm(payload) {
  let isFormValid = true;
  let message = '';

  if (!payload || !(payload.times instanceof Array) || payload.times.length == 0) {
    isFormValid = false;
  }

  if (!payload || !payload.date) {
    isFormValid = false;
  }

  if (!isFormValid) {
    message = 'Los datos contienen errores.';
  }

  return {
    success: isFormValid,
    message,
  };
}

router.get('/dashboard', (req, res) => {
  console.log(req.decoded);
  res.json({
    message: "Bienvenido a Almuerzos."
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

router.post('/lunch', (req, res) => {

  const validationResult = validateLunchForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message
    });
  }

  console.log(req.body);
  Lunch.findOne({
    creator: {
      $ne: req.userId
    },
    date: req.body.date,
    times: {
      $in: req.body.times
    }
  }).exec(function(err, lunch) {
    if (err) return res.send(err);
    console.log("aa");
    if (!lunch) {
      // create a new instance of the User model
      var newLunch = new Lunch();

      // set the users information (comes from the request)
      newLunch.creator = req.userId;
      newLunch.partner = null;
      newLunch.date = req.body.date;
      newLunch.times = req.body.times;

      console.log("a");
      newLunch.save(function(err) {
        console.log("b");
        if (err) return res.send(err);
        console.log("bb");
        res.json({
          message: "¡Genial! Si encontramos alguien que se ajuste a tu horario, te lo enviaremos al correo.",
          found: false
        });
      });
    } else {
      console.log("c");

      lunch.partner = req.userId;
      lunch.save(function(err, item) {
        if (err) return res.send(err);

        Lunch.findOne(item)
          .populate('creator partner')
          .exec(function (err, savedLunch) {
          if (err) return res.send(err);

          // mail options closure
          let mailOptions = (user, partner) => {
            return {
              from: '"Almuerzos" <almuerzos@castrovaron.com>', // sender address
              to: partner.email, // list of receivers
              subject: '¡Tu cita de almuerzo!', // Subject line
              html: `<b>¡Te hemos encontrado una cita para almorzar!</b><br>Escríbele a tu compañero para arreglar detalles:<br>
                      <ul>
                        <li><b>Nombre:</b> ` + user.name  + `</li>
                        <li><b>Correo:</b> ` + user.email + `</li>
                        <li><b>Día:</b> `    + lunch.date.toLocaleDateString("es-ES") + `</li>
                      </ul>`
            };
          };

          // send mail to creator
          mailer.sendMail(
            mailOptions(savedLunch.creator, savedLunch.partner), (error, info) => {
            if (err) return res.send(err);
            
            // send mail to partner
            mailer.sendMail(
              mailOptions(savedLunch.partner, savedLunch.creator), (error, info) => {
              if (err) return res.send(err);
              
              res.json({
                message: "¡Genial! Si encontramos alguien que se ajuste a tu horario, te lo enviaremos al correo.",
                found: true
              });
            });
          });
        });
      });
    }
  });
});




module.exports = router;
