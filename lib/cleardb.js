import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace with your MongoDB URI
const uri = "mongodb+srv://david_dozer:dep102024!@onfeetcluster.8rxbm.mongodb.net/?retryWrites=true&w=majority&appName=onFeetCluster";

async function clearDatabase() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to MongoDB!");

    // Select the database and collection
    const collection = client.db("onFeetDB").collection("sneakers");

    // Delete all documents from the collection
    const result = await collection.deleteMany({});
    console.log(`${result.deletedCount} documents were deleted`);

  } catch (error) {
    console.error("Error clearing the database:", error);
  } finally {
    await client.close(); // Ensure the client is closed after operation
  }
}

clearDatabase();
