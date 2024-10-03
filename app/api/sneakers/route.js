import { NextResponse } from 'next/server';
import SneaksAPI from 'changed-sneaks-api'; // External API
const sneaks = new SneaksAPI();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  // Ensure query parameter is provided
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Search in the external SneaksAPI
    const products = await new Promise((resolve, reject) => {
      sneaks.getProducts(query, 50, (err, products) => {
        if (err) {
          console.error('Error fetching products from SneaksAPI:', err);
          reject(err);
        } else {
          resolve(products);
        }
      });
    });

    // If products are found, return them
    if (products.length > 0) {
      return NextResponse.json(products, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No sneakers found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error fetching products from SneaksAPI:', error);
    return NextResponse.json({ error: 'Failed to fetch sneakers: ' + error.message }, { status: 500 });
  }
}
