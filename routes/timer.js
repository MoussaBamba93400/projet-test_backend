const express = require('express');
const router = express.Router();
const Timer = require('../models/Timer');
const authMiddleware = require('../middleware/auth');


router.post('/submit-reaction-time', authMiddleware, async (req, res) => {
    const { time } = req.body;

    try {
        const timer = new Timer({ user_id: req.user.id, time });
        await timer.save();

        res.status(201).json({ msg: 'Reaction time submitted' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.get('/get-reaction-times/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;

    try {
        const times = await Timer.find({ user_id: userId }).sort({ createdAt: -1 });
        res.status(200).json(times);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
