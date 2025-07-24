const db = require('../db');

// Create a new match
exports.createMatch = async (req, res) => {
  const hostId = req.user.id;
  const {
    title,
    location,
    pitch_type,
    match_date,
    skill_level,
    max_players
  } = req.body;

  try {
    await db.query(
      'INSERT INTO matches (host_id, title, location, pitch_type, match_date, skill_level, max_players) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [hostId, title, location, pitch_type, match_date, skill_level, max_players]
    );
    res.status(201).json({ message: 'Match created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating match' });
  }
};

// View participants of a match
exports.getMatchParticipants = async (req, res) => {
  const matchId = req.params.match_id;

  try {
    const [participants] = await db.query(
      `SELECT u.id, u.name, m.status 
       FROM match_participants m 
       JOIN users u ON m.player_id = u.id 
       WHERE m.match_id = ?`,
      [matchId]
    );
    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving participants' });
  }
};

// Approve or reject participant
exports.updateParticipantStatus = async (req, res) => {
  const { match_id, player_id, status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    await db.query(
      'UPDATE match_participants SET status = ? WHERE match_id = ? AND player_id = ?',
      [status, match_id, player_id]
    );
    res.json({ message: `Player has been ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating participant status' });
  }
};