-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('player', 'host', 'team'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Players Table
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    position VARCHAR(50),
    skill_level VARCHAR(50),
    experience TEXT,
    video_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Hosts Table
CREATE TABLE hosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    organisation_name VARCHAR(100),
    rating FLOAT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Teams Table
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    team_name VARCHAR(100),
    level VARCHAR(50),
    location VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Events Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    host_id INT,
    event_type ENUM('match', 'trial'),
    title VARCHAR(100),
    location VARCHAR(100),
    surface_type VARCHAR(50),
    pitch_size VARCHAR(50),
    date DATE,
    time TIME,
    skill_requirement VARCHAR(50),
    max_players INT,
    description TEXT,
    FOREIGN KEY (host_id) REFERENCES hosts(id)
);

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    player_id INT,
    status ENUM('pending', 'confirmed', 'cancelled'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (player_id) REFERENCES players(id)
);

-- Ratings Table
CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_user_id INT,
    to_user_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(id),
    FOREIGN KEY (to_user_id) REFERENCES users(id)
);

-- Pitches Table (Mock Data)
CREATE TABLE pitches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    size ENUM('5-a-side', '7-a-side', '11-a-side'),
    surface VARCHAR(50),
    availability TEXT
);
