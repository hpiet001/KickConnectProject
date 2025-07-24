const db = require('../db');

// Create a new trial event
exports.createTrial = async (req, res) => {
  const teamId = req.user.id;
  const {
    title,
    description,
    location,
    trial_date,
    skill_level,
    max_applicants
  } = req.body;

  try {
    await db.query(
      `INSERT INTO trials (team_id, title, description, location, trial_date, skill_level, max_applicants)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [teamId, title, description, location, trial_date, skill_level, max_applicants]
    );
    res.status(201).json({ message: 'Trial event created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating trial' });
  }
};

// View players who applied to a trial
exports.getTrialApplicants = async (req, res) => {
  const trialId = req.params.trial_id;

  try {
    const [applicants] = await db.query(
      `SELECT u.id, u.name, a.status 
       FROM trial_applicants a 
       JOIN users u ON a.player_id = u.id 
       WHERE a.trial_id = ?`,
      [trialId]
    );
    res.json(applicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching applicants' });
  }
};

// Approve or reject a trial applicant
exports.updateTrialStatus = async (req, res) => {
  const { trial_id, player_id, status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    await db.query(
      'UPDATE trial_applicants SET status = ? WHERE trial_id = ? AND player_id = ?',
      [status, trial_id, player_id]
    );
    res.json({ message: `Player has been ${status} for the trial` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating trial status' });
  }
};

// Browse and filter player profiles
exports.scoutPlayers = async (req, res) => {
  const { position, skill_level, location } = req.query;

  try {
    const [players] = await db.query(
      `SELECT id, name, position, skill_level, location
       FROM users
       WHERE role = 'player'
       AND (? IS NULL OR position = ?)
       AND (? IS NULL OR skill_level = ?)
       AND (? IS NULL OR location = ?)`,
      [position, position, skill_level, skill_level, location, location]
    );
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching player profiles' });
  }
};