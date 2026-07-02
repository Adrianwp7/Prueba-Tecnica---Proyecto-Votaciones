CREATE TABLE candidates(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    party VARCHAR(255),
    votes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);