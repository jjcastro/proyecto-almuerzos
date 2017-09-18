const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const User     = require('./user');

// define the User model schema
const LunchSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date:    { type: Date, required: true  },
  times:    { type: [{
    type: String,
    enum: ['11:00','12:30','2:00']
  }], required: true  },
});

module.exports = mongoose.model('Lunch', LunchSchema);
