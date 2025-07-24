const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new match
router.post('/create', (req, res) => {
  const { host_id, title, location, date, time, max_players, skill_level } = req.body;

  const query = `
    INSERT INTO matches (host_id, title, location, date, time, max_players, skill_level)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [host_id, title, location, date, time, max_players, skill_level], (err, result) => {
    if (err) {
      console.error('Error creating match:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Match created successfully', match_id: result.insertId });
  });
});

// View matches created by a host
router.get('/my-matches/:host_id', (req, res) => {
  const { host_id } = req.params;

  const query = `
    SELECT * FROM matches
    WHERE host_id = ?
    ORDER BY date ASC
  `;

  db.query(query, [host_id], (err, results) => {
    if (err) {
      console.error('Error fetching matches:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});

// Get list of players attending a match
router.get('/match-attendees/:match_id', (req, res) => {
  const { match_id } = req.params;

  const query = `
    SELECT u.id, u.name, u.position, u.skill_level
    FROM match_attendees ma
    JOIN users u ON ma.player_id = u.id
    WHERE ma.match_id = ?
  `;

  db.query(query, [match_id], (err, results) => {
    if (err) {
      console.error('Error fetching attendees:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});

module.exports = router;