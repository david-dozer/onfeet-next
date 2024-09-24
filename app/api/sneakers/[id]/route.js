import { NextResponse } from 'next/server';
import SneaksAPI from 'sneaks-api';
import Sneaker from '../../../../models/Sneaker';  // Import the Sneaker model

const sneaks = new SneaksAPI();

export async function GET(request, { params }) {
  const { id } = params;  // Extract the sneaker ID from the URL

  try {
    // First, try fetching the sneaker from the external API
    return new Promise((resolve) => {
      sneaks.getProducts(id, 1, async (err, products) => {
        if (err || products.length === 0) {
          // If the sneaker is not found in the API, look for it in the local database
          const localSneaker = await Sneaker.findById(id);
          if (!localSneaker) {
            resolve(NextResponse.json({ error: 'Sneaker not found' }, { status: 404 }));
          } else {
            resolve(NextResponse.json(localSneaker, { status: 200 }));
          }
        } else {
          resolve(NextResponse.json(products[0], { status: 200 }));
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sneaker details' }, { status: 500 });
  }
}
