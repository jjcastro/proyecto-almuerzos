const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.database, {
  useMongoClient: true,
});

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./client/public/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(config.port, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
