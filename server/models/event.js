const db = require('../db');

// Create a new event (match)
exports.createEvent = async (event) => {
  const { host_id, title, date, location, skill_level, max_players } = event;
  const [result] = await db.query(
    'INSERT INTO events (host_id, title, date, location, skill_level, max_players) VALUES (?, ?, ?, ?, ?, ?)',
    [host_id, title, date, location, skill_level, max_players]
  );
  return result.insertId;
};

// Get all events
exports.getAllEvents = async () => {
  const [rows] = await db.query('SELECT * FROM events');
  return rows;
};

// Get event by ID
exports.getEventById = async (id) => {
  const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
  return rows[0];
};

// Join an event
exports.joinEvent = async (event_id, player_id) => {
  const [result] = await db.query(
    'INSERT INTO event_participants (event_id, player_id) VALUES (?, ?)',
    [event_id, player_id]
  );
  return result.insertId;
};

// Get participants for an event
exports.getParticipants = async (event_id) => {
  const [rows] = await db.query(
    `SELECT users.id, users.name, users.position 
     FROM event_participants 
     JOIN users ON users.id = event_participants.player_id 
     WHERE event_participants.event_id = ?`,
    [event_id]
  );
  return rows;
};