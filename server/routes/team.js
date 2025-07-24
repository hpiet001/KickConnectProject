const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a trial event
router.post('/create-trial', (req, res) => {
  const { team_id, title, location, date, time, required_position, skill_level } = req.body;

  const query = `
    INSERT INTO trials (team_id, title, location, date, time, required_position, skill_level)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [team_id, title, location, date, time, required_position, skill_level], (err, result) => {
    if (err) {
      console.error('Error creating trial:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Trial created successfully', trial_id: result.insertId });
  });
});

// Browse player profiles (basic scouting)
router.get('/scout', (req, res) => {
  const { position, min_skill } = req.query;

  let query = `SELECT id, name, age, position, skill_level FROM users WHERE role = 'player'`;
  const params = [];

  if (position) {
    query += ` AND position = ?`;
    params.push(position);
  }

  if (min_skill) {
    query += ` AND skill_level >= ?`;
    params.push(min_skill);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error scouting players:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});

// Invite player to trial
router.post('/invite-player', (req, res) => {
  const { trial_id, player_id } = req.body;

  const query = `
    INSERT INTO trial_invites (trial_id, player_id)
    VALUES (?, ?)
  `;

  db.query(query, [trial_id, player_id], (err) => {
    if (err) {
      console.error('Error inviting player:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Player invited to trial' });
  });
});

module.exports = router;