// api/sneakers/route.js
import { NextResponse } from 'next/server';
import SneaksAPI from 'changed-sneaks-api';
import Sneaker from '../../../models/Sneaker';  // Mongoose model

const sneaks = new SneaksAPI();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    return new Promise((resolve) => {
      // Fetch products from the external API
      sneaks.getProducts(query, 25, async (err, products) => {
        if (err) {
          resolve(NextResponse.json({ error: 'Failed to fetch products from API' }, { status: 500 }));
        } else if (products.length > 0) {
          // Insert each product into MongoDB (uniqueness handled in the POST request)
          products.forEach(async (product) => {
            const newSneaker = new Sneaker({
              id: product._id,
              shoeName: product.shoeName,
              brand: product.brand,
              colorway: product.colorway,
              retailPrice: product.retailPrice || 0,
              releaseDate: product.releaseDate || 'N/A',
              description: product.description || 'N/A',
              thumbnail: product.thumbnail || ''
            });
            await newSneaker.save();  // Insert new product without checking for duplicates
          });

          resolve(NextResponse.json(products, { status: 200 }));
        } else {
          // Search MongoDB if no products found in external API
          const localSneakers = await Sneaker.find({ shoeName: new RegExp(query, 'i') }).limit(10);
          resolve(NextResponse.json(localSneakers, { status: 200 }));
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sneakers' }, { status: 500 });
  }
}
