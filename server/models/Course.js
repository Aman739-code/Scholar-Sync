const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String, // STEM, ARTS, etc.
    required: true
  },
  totalHours: {
    type: Number,
    default: 0
  },
  modules: [
    {
      title: String,
      content: String,
      duration: Number
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);
