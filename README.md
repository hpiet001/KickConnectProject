# KickConnect: The Football Community Matchmaker ⚽

KickConnect is a role-based football matchmaking platform designed to connect **Players**, **Hosts**, and **Teams** at the grassroots level. This Node.js-based web application allows users to organise casual games, attend trials, scout talent, and simulate pitch bookings — all within a scalable and modular proof-of-concept.

---

## 🚀 Features

### 👤 Players
- Create profiles with skill tags and highlight clips
- Browse and join casual matches or trials
- Receive personalised event recommendations
- Rate hosts and receive feedback after events

### 🧑‍💼 Hosts
- Create and manage football events (5v5 to 11v11)
- Set player limits, skill filters, and surface preferences
- View attendance lists and simulate payment tracking
- Search and book mock pitches

### 🧩 Teams
- Host open or invite-only trials
- Scout players using filters (position, skill, location)
- Message shortlisted candidates

---

## 🛠️ Tech Stack

| Layer       | Technology            |
|------------|------------------------|
| Frontend   | HTML5, CSS3, EJS       |
| Backend    | Node.js, Express       |
| Database   | MySQL (via MySQL Workbench) |
| Auth       | JWT (JSON Web Tokens)  |
| Design     | Figma (UI mockups)     |
| Versioning | Git & GitHub           |

---

## 📁 Folder Structure

```
KickConnectProject/
│
├── controllers/
├── models/
├── routes/
├── views/
│   ├── auth/
│   ├── dashboard.ejs
│   └── layout.ejs
├── public/
│   └── index.html
├── middleware/
├── db.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## 🔐 Authentication

KickConnect uses **JWT-based authentication** to:
- Protect API routes
- Enforce role-based access (Player, Host, Team)
- Handle login sessions securely

---

## 💻 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/kickconnect.git
   cd kickconnect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file and configure:**
   ```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=@H29e1p04
DB_NAME=kickconnect_db
DB_PORT=3000
JWT_SECRET=kickconnectsupersecretjwt123 
   ```

4. **Set up MySQL database:**
   - Open MySQL Workbench and run the database creation script provided in `/models`.

5. **Start the server:**
   ```bash
   node server.js
   ```

6. **Visit the app in your browser:**
   ```
   http://localhost:3000
   ```

---

## 📊 Future Improvements

- React or React Native frontend
- Real payment gateway integration (Stripe/PayPal)
- Cloud media storage (AWS S3)
- AI-powered recommendation system (collaborative filtering)
- Admin dashboard for moderation