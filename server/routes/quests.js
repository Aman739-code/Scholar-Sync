const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Quest = require('../models/Quest');

// @route   GET api/quests
// @desc    Get user's active quests
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const quests = await Quest.find({ user: req.user.id, status: 'Pending' }).sort({ dueDate: 1 });
    res.json(quests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/quests/:id/complete
// @desc    Mark a quest as completed
// @access  Private
router.put('/:id/complete', auth, async (req, res) => {
  try {
    let quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ msg: 'Quest not found' });
    
    if (quest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    quest.status = 'Completed';
    await quest.save();

    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
