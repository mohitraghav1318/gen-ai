const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required'],
  },
});

const blacklistModel = mongoose.model('blacklistToken', blacklistSchema);

module.exports = blacklistModel;
