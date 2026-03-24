const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Squad = require('../models/Squad');
const auth = require('../middleware/auth');

// @route   GET api/leaderboard/global
// @desc    Get top 100 scholars by XP
// @access  Public
router.get('/global', async (req, res) => {
  try {
    const scholars = await User.find()
      .select('name xp level avatar')
      .sort({ xp: -1 })
      .limit(100);
      
    res.json(scholars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/leaderboard/squads
// @desc    Get squad comparison / leaderboard
// @access  Public
router.get('/squads', async (req, res) => {
  try {
    const squads = await Squad.find()
      .select('name description totalXp')
      .sort({ totalXp: -1 })
      .limit(50);
      
    res.json(squads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
