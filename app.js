// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const db = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressLayouts);
app.set('layout', 'layout'); // looks for views/layout.ejs

// Session store setup
const sessionStore = new MySQLStore({}, db);
app.use(session({
  key: 'kickconnect_sid',
  secret: 'kickconnect_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 1 hour
  }
}));

// Routes
app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth'));
app.use('/player', require('./routes/player'));
app.use('/host', require('./routes/host'));
app.use('/team', require('./routes/team'));

// Start server
app.listen(port, () => {
  console.log(`KickConnect app running at http://localhost:${port}`);
});
