const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public (or Private depending on requirements, assuming Private here)
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/my-enrollments
// @desc    Get current user's enrolled courses and progress
// @access  Private
router.get('/my-enrollments', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate('course')
      .sort({ updatedAt: -1 });
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/courses/progress/:id
// @desc    Update progress for a specific enrollment
// @access  Private
router.put('/progress/:id', auth, async (req, res) => {
  try {
    const { progressPercentage, completedModuleId } = req.body;
    let enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }

    // Ensure user owns enrollment
    if (enrollment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    if (progressPercentage !== undefined) {
      enrollment.progressPercentage = progressPercentage;
    }

    if (completedModuleId) {
      // Check if not already added
      const alreadyCompleted = enrollment.completedModules.some(
        m => m.moduleId && m.moduleId.toString() === completedModuleId
      );
      if (!alreadyCompleted) {
        enrollment.completedModules.unshift({ moduleId: completedModuleId });
      }
    }

    if (enrollment.progressPercentage >= 100) {
      enrollment.status = 'Completed';
    }

    await enrollment.save();
    res.json(enrollment);

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
