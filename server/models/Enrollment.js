const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  progressPercentage: {
    type: Number,
    default: 0
  },
  completedModules: [
    {
      moduleId: mongoose.Schema.Types.ObjectId,
      completedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Dropped'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
