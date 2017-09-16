const express = require('express');
const validator = require('validator');
const passport = require('passport');
const mailer = require('../nodemailer');

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Por favor ingresa un correo electrónico válido @uniandes.com.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Por favor ingresa tu nombre.';
  }

  if (!isFormValid) {
    message = 'Los datos contienen errores.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Por favor ingresa tu correo electrónico.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Por favor ingresa tu contraseña.';
  }

  if (!isFormValid) {
    message = 'Los datos contienen errores.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      console.log(err);
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Los datos contienen errores.',
          errors: {
            email: 'Este correo electrónico ya ha sido registrado.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'No se pudieron enviar los datos.'
      });
    }

    console.log(req.body);

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Almuerzos" <almuerzos@castrovaron.com>', // sender address
      to: req.body.email, // list of receivers
      subject: '¡Bienvenido a almuerzos, ' + req.body.name + '! 🌮🍔', // Subject line
      html: '<b>Te has registrado exitosamente en almuerzos con el correo: </b><br><i>' + req.body.email + '</i>' // html body
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Mensaje enviado: %s', info.messageId);
    });

    return res.status(200).json({
      success: true,
      message: '¡Te has registrado exitosamente! Ya puedes iniciar sesión.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'No se pudo enviar los datos.'
      });
    }


    return res.json({
      success: true,
      message: '¡Has iniciado sesión exitosamente!',
      token,
      user: userData
    });
  })(req, res, next);
});


module.exports = router;
