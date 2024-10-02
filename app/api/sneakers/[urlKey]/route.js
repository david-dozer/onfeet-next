// api/sneakers/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import { ObjectId } from 'mongodb'; // To handle MongoDB ObjectId

export async function GET(request, { params }) {
  const { urlKey } = params; // Extracting the `urlKey` from the request parameters

  // Logging the urlKey to make sure it is passed correctly
  console.log('Received urlKey:', urlKey);

  // Connect to the database using the cached client
  let client;
  try {
    client = await dbConnect();  // Ensure connection is established
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: 'Failed to connect to MongoDB: ' + error.message }, { status: 500 });
  }

  const collection = client.db("onFeetDB").collection("sneakers");

  try {
    // Fetch the sneaker by its `urlKey` field (since it's not an ObjectId)
    console.log('Attempting to fetch product with urlKey:', urlKey);
    const sneaker = await collection.findOne({ urlKey: urlKey });

    // Check if the product exists
    if (!sneaker) {
      console.log('Product not found for urlKey:', urlKey);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    console.log('Product found:', sneaker);
    return NextResponse.json(sneaker, { status: 200 });
  } catch (error) {
    // Handle any errors in fetching the product
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product: ' + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const sneakerData = await request.json();
  const { shoeName } = sneakerData;

  // Logging the shoeName to make sure it is passed correctly
  console.log('Received shoeName for insertion or fetch:', shoeName);

  // Connect to the database using the cached client
  let client;
  try {
    client = await dbConnect();
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: 'Failed to connect to MongoDB: ' + error.message }, { status: 500 });
  }

  const collection = client.db("onFeetDB").collection("sneakers");

  try {
    // Check if a product with the same shoeName already exists
    const existingSneaker = await collection.findOne({ shoeName: shoeName });
    
    if (existingSneaker) {
      console.log('Product found in database, returning existing product:', shoeName);
      return NextResponse.json(existingSneaker, { status: 200 }); // Return the existing product
    }

    // Insert the new product since it doesn't exist
    const sneaker = {
      shoeName: sneakerData.shoeName,
      brand: sneakerData.brand,
      silhoutte: sneakerData.silhoutte,
      styleID: sneakerData.styleID,
      retailPrice: sneakerData.retailPrice || 0,
      releaseDate: sneakerData.releaseDate || 'N/A',
      description: sneakerData.description || 'N/A',
      imageLinks: sneakerData.imageLinks || [],
      thumbnail: sneakerData.thumbnail || '',
      urlKey: sneakerData.urlKey,
      make: sneakerData.make || 'N/A',
      goatProductId: sneakerData.goatProductId || 0,
      colorway: sneakerData.colorway || '',
      resellLinks: {
        stockX: sneakerData.resellLinks?.stockX || '',
        stadiumGoods: sneakerData.resellLinks?.stadiumGoods || '',
        goat: sneakerData.resellLinks?.goat || '',
        flightClub: sneakerData.resellLinks?.flightClub || ''
      },
      lowestResellPrice: {
        stockX: sneakerData.lowestResellPrice?.stockX || 0,
        stadiumGoods: sneakerData.lowestResellPrice?.stadiumGoods || 0,
        goat: sneakerData.lowestResellPrice?.goat || 0,
        flightClub: sneakerData.lowestResellPrice?.flightClub || 0
      },
      resellPrices: sneakerData.resellPrices || {}
    };

    await collection.insertOne(sneaker);

    console.log('Product stored successfully with shoeName:', shoeName);
    return NextResponse.json(sneaker, { status: 200 });
  } catch (error) {
    console.error('Error storing product:', error);
    return NextResponse.json({ error: 'Failed to store product: ' + error.message }, { status: 500 });
  }
}
