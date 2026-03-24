const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserAchievement = require('../models/UserAchievement');

// @route   GET api/achievements/me
// @desc    Get user's earned achievements
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const userAchievements = await UserAchievement.find({ user: req.user.id })
      .populate('achievement')
      .sort({ earnedAt: -1 });
      
    res.json(userAchievements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
