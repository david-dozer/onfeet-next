// api/sneakers/[id]/route.js
import { NextResponse } from 'next/server';
import db from '../../../../lib/db' // SQLite connection

// Function to set up the SQLite table if it doesn't already exist
import { setupDatabase } from '../../../../lib/setup';  
setupDatabase();

export async function GET(request, { params }) {
  const { id } = params;

  // Check if the sneaker already exists in the SQLite database
  const sneaker = db.prepare(`SELECT * FROM sneakers WHERE id = ?`).get(id);

  if (!sneaker) {
    return NextResponse.json({ error: 'Product not found in local database' }, { status: 404 });
  }

  // Return the sneaker details from the SQLite database
  return NextResponse.json(sneaker, { status: 200 });
}

export async function POST(request, { params }) {
  const { id } = params;
  const sneaker = await request.json();  // Get sneaker details from the request body

  try {
    // Insert or replace the sneaker in the SQLite database
    const insert = db.prepare(`
      INSERT INTO sneakers (id, shoeName, brand, colorway, retailPrice, releaseDate, description, thumbnail) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      sneaker.shoeName,
      sneaker.brand,
      sneaker.colorway,
      sneaker.retailPrice || 0,
      sneaker.releaseDate || 'N/A',
      sneaker.description || 'N/A',
      sneaker.thumbnail || ''
    );

    return NextResponse.json({ message: 'Product stored successfully' }, { status: 200 });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      // Handle the duplicate error (SQLITE_CONSTRAINT error is thrown for unique constraint violation)
      return NextResponse.json({ error: 'Product already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to store product' }, { status: 500 });
  }
}
