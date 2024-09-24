import { NextResponse } from 'next/server';
import SneaksAPI from 'changed-sneaks-api';
import Sneaker from '../../../models/Sneaker';  // Import the Sneaker model

const sneaks = new SneaksAPI();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // First, try fetching sneakers from the external API
    return new Promise((resolve) => {
      sneaks.getProducts(query, 10, async (err, products) => {
        if (err) {
          resolve(NextResponse.json({ error: 'Failed to fetch products from API' }, { status: 500 }));
        } else if (products.length > 0) {
          // If products are found from the external API, return them
          resolve(NextResponse.json(products, { status: 200 }));
        } else {
          // Optionally, search for sneakers in the local database using Mongoose
          const localSneakers = await Sneaker.find({ shoeName: new RegExp(query, 'i') }).limit(10);
          resolve(NextResponse.json(localSneakers, { status: 200 }));
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sneakers' }, { status: 500 });
  }
}
