// lib/setup.js
import db from './db.js';

// Function to create the sneakers table if it doesn't exist
export function setupDatabase() {
  const query = `
    CREATE TABLE IF NOT EXISTS sneakers (
      id TEXT PRIMARY KEY,  -- Primary key ensures uniqueness by default
      shoeName TEXT,
      brand TEXT,
      colorway TEXT,
      retailPrice REAL,
      releaseDate TEXT,
      description TEXT,
      thumbnail TEXT,
      UNIQUE(id)  -- Enforces uniqueness for the id field
    )
  `;
  db.prepare(query).run(); // Execute the query
}
