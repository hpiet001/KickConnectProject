const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const connectDB = () => {
  connection.connect(err => {
    if (err) {
      console.error('MySQL connection failed:', err.message);
      process.exit(1);
    } else {
      console.log('MySQL connected successfully.');
    }
  });
};

module.exports = connectDB;
