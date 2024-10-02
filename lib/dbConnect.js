import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let cachedClient = null; // Cache the MongoClient to reuse the connection

// Function to connect to the database
async function dbConnect() {
    if (!cachedClient) {
      try {
        // Connect the client to the server
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        cachedClient = client; // Cache the client after connection
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Could not connect to MongoDB');
      }
    }
    return cachedClient; // Return the connected MongoClient
  }
  
  export default dbConnect;
