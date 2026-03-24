const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary'],
    default: 'Common'
  },
  xpReward: {
    type: Number,
    default: 100
  },
  iconUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema);
