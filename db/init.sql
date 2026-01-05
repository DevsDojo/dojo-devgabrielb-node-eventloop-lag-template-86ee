CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(100)
);

-- Seed 500 Users
INSERT INTO users (name) SELECT 'User ' || generate_series(1, 500);

-- Seed Posts (2 per user)
INSERT INTO posts (user_id, title) 
SELECT u.id, 'Post A of ' || u.name FROM users u
UNION ALL
SELECT u.id, 'Post B of ' || u.name FROM users u;
