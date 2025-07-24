const db = require('../db');

// Create a new pitch booking
exports.createBooking = async (booking) => {
  const { user_id, pitch_id, date, time } = booking;
  const [result] = await db.query(
    'INSERT INTO pitch_bookings (user_id, pitch_id, date, time) VALUES (?, ?, ?, ?)',
    [user_id, pitch_id, date, time]
  );
  return result.insertId;
};

// Get all bookings for a specific user
exports.getBookingsByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT pb.id, p.name AS pitch_name, pb.date, pb.time 
     FROM pitch_bookings pb
     JOIN pitches p ON pb.pitch_id = p.id
     WHERE pb.user_id = ?`,
    [user_id]
  );
  return rows;
};

// Get all bookings
exports.getAllBookings = async () => {
  const [rows] = await db.query(
    `SELECT pb.id, u.name AS user_name, p.name AS pitch_name, pb.date, pb.time
     FROM pitch_bookings pb
     JOIN users u ON pb.user_id = u.id
     JOIN pitches p ON pb.pitch_id = p.id`
  );
  return rows;
};