const db = require('../db');

// Create a new user
exports.createUser = async (user) => {
  const { name, email, password, role, position, skill_level, location } = user;
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role, position, skill_level, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, password, role, position, skill_level, location]
  );
  return result.insertId;
};

// Find a user by email
exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// Find a user by ID
exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};