const mongoose = require('mongoose');

const SquadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  inviteCode: {
    type: String,
    unique: true
  },
  totalXp: {
    type: Number,
    default: 0
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Squad', SquadSchema);
