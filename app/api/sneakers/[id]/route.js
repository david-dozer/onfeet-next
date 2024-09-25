// api/sneakers/[id]/route.js
const sneakersData = {}; // In-memory storage for the products

export async function POST(request, { params }) {
  const { id } = params;
  const product = await request.json();

  // Store the product data in memory
  sneakersData[id] = product;

  return new Response(JSON.stringify({ message: 'Product stored successfully' }), { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;

  // Check if product exists
  const product = sneakersData[id];

  if (!product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(product), { status: 200 });
}
