import mongoose from 'mongoose';

// Define the schema for the sneaker
const SneakerSchema = new mongoose.Schema({
  shoeName: String,
  brand: String,
  styleID: String,
  retailPrice: Number,
  lowestResellPrice: {
    stockX: Number,
    flightClub: Number,
    goat: Number,
  },
  thumbnail: String,
  description: String,
  releaseDate: String,
  resellLinks: {
    stockX: String,
    flightClub: String,
    goat: String,
  },
});

// Use the existing compiled model if it exists, otherwise create a new one
export default mongoose.models.Sneaker || mongoose.model('Sneaker', SneakerSchema);
