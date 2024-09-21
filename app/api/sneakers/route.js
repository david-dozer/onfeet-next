const { NextResponse } = require('next/server');
const SneaksAPI = require('changed-sneaks-api'); // Use require to import sneaks-api

const sneaks = new SneaksAPI(); // Initialize the API

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  return new Promise((resolve) => {
    sneaks.getProducts(query, 10, (err, data) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(data, { status: 200 }));
      }
    });
  });
}
