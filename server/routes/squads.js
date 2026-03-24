const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Squad = require('../models/Squad');
const User = require('../models/User');

// Helper to generate random invite code
const generateInviteCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// @route   POST api/squads
// @desc    Create a new squad
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;

  try {
    const inviteCode = generateInviteCode();
    
    const newSquad = new Squad({
      name,
      description,
      inviteCode,
      members: [req.user.id]
    });

    const squad = await newSquad.save();

    // Update user to be part of this squad
    await User.findByIdAndUpdate(req.user.id, { $set: { squadPath: squad.id } });

    res.json(squad);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/squads/join
// @desc    Join a squad via invite code
// @access  Private
router.post('/join', auth, async (req, res) => {
  const { inviteCode } = req.body;

  try {
    const squad = await Squad.findOne({ inviteCode });
    if (!squad) {
      return res.status(404).json({ msg: 'Squad not found or invalid invite code' });
    }

    // Check if user is already a member
    if (squad.members.includes(req.user.id)) {
      return res.status(400).json({ msg: 'You are already a member of this squad' });
    }

    squad.members.push(req.user.id);
    await squad.save();

    // Update user's squad path
    await User.findByIdAndUpdate(req.user.id, { $set: { squadPath: squad.id } });

    res.json(squad);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/squads/:id
// @desc    Get squad details and rankings
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const squad = await Squad.findById(req.params.id).populate('members', '-password');
    if (!squad) {
      return res.status(404).json({ msg: 'Squad not found' });
    }
    
    // Sort members by xp descending for rankings
    squad.members.sort((a, b) => b.xp - a.xp);

    res.json(squad);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Squad not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
