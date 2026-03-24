const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const News = require('../models/News');
const StudySession = require('../models/StudySession');

// @route   GET api/community/news
// @desc    Get Campus Pulse feed
// @access  Private
router.get('/news', auth, async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/community/sessions
// @desc    Get active study sessions
// @access  Private
router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await StudySession.find({ status: 'Active' })
      .populate('activeUsers', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
