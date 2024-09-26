// lib/db.js

import Database from 'better-sqlite3';  // Import SQLite library
import path from 'path';  // Import path from Node.js

// Open a SQLite database file (will create it if it doesn't exist)
const db = new Database(path.join(process.cwd(), 'database', 'sneakers.db'));  // Use path.join for correct path handling

export default db;  // Export the database connection
