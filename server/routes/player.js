const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const db = require('../db');

// @route   GET /player/profile
// @desc    Get current player's profile
router.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const sql = 'SELECT * FROM users WHERE id = ? AND role = "Player"';
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.length === 0) return res.status(404).json({ message: 'Player not found' });

    res.json(result[0]);
  });
});

// @route   PUT /player/profile
// @desc    Update player profile
router.put('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { position, skill_level, bio } = req.body;

  const sql = 'UPDATE users SET position = ?, skill_level = ?, bio = ? WHERE id = ? AND role = "Player"';
  db.query(sql, [position, skill_level, bio, userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database update error' });
    res.json({ message: 'Profile updated successfully' });
  });
});

// @route   GET /player/recommendations
// @desc    Get event recommendations for player (simulated logic)
router.get('/recommendations', authenticateToken, (req, res) => {
  // Simulated recommendations — in production, use real matching logic
  const sql = 'SELECT * FROM events WHERE skill_level = ? LIMIT 5';
  db.query(sql, [req.user.skill_level], (err, results) => {
    if (err) return res.status(500).json({ error: 'Recommendation query failed' });
    res.json({ recommendedEvents: results });
  });
});

module.exports = router;
