CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    voter_id INTEGER NOT NULL REFERENCES voters(id),
    candidate_id INTEGER NOT NULL REFERENCES candidates(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(voter_id)
);