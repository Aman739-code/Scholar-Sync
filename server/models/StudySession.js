const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  activeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  squad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Squad'
  },
  status: {
    type: String,
    enum: ['Active', 'Ended'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudySession', StudySessionSchema);
