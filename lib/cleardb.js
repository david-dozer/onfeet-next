// lib/cleardb.js

import db from './db.js';  // Use ES module import for the SQLite database connection
import { setupDatabase } from './setup.js';  // Import the setup function to recreate the table

// Function to clear and reset the sneakers table
function resetSneakersTable() {
  try {
    // Clear all rows from the sneakers table
    db.prepare('DROP TABLE IF EXISTS sneakers').run();  // Drop the sneakers table if it exists
    console.log('Sneakers table has been dropped.');

    // Recreate the sneakers table
    setupDatabase();  // Run the setup function to recreate the table
    console.log('Sneakers table has been recreated.');
    
  } catch (error) {
    console.error('Failed to reset the sneakers table:', error);
  }
}

// Execute the function to clear and reset the database
resetSneakersTable();
