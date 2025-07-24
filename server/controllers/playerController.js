const db = require('../db');

// Get player profile
exports.getPlayerProfile = async (req, res) => {
  const playerId = req.params.id;

  try {
    const [result] = await db.query('SELECT * FROM player_profiles WHERE user_id = ?', [playerId]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Player profile not found' });
    }
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching player profile' });
  }
};

// Update player profile
exports.updatePlayerProfile = async (req, res) => {
  const playerId = req.params.id;
  const { position, skill_level, experience_level, bio, availability } = req.body;

  try {
    await db.query(
      'UPDATE player_profiles SET position = ?, skill_level = ?, experience_level = ?, bio = ?, availability = ? WHERE user_id = ?',
      [position, skill_level, experience_level, bio, availability, playerId]
    );
    res.json({ message: 'Player profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Join a match
exports.joinMatch = async (req, res) => {
  const playerId = req.user.id;
  const { match_id } = req.body;

  try {
    await db.query('INSERT INTO match_participants (match_id, player_id, status) VALUES (?, ?, ?)', [
      match_id, playerId, 'pending'
    ]);
    res.status(200).json({ message: 'Join request sent to host' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error joining match' });
  }
};