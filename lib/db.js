// lib/db.js
import Database from 'better-sqlite3';
import { join } from 'path';

// Open a SQLite database file (will create it if it doesn't exist)
const db = new Database(join(process.cwd(), 'database', 'sneakers.db'));

export default db;
