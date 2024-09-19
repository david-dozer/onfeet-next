import React from 'react';
import { useParams } from 'react-router-dom';

const Sneaker = ({ productData }) => {
  const { id } = useParams(); // Assuming you are passing the product ID through the route params
  const product = productData.find(item => item._id === id); // Find product by ID

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="sneaker-page">
      <h1>{product.shoeName}</h1>
      <img src={product.thumbnail} alt={product.shoeName} className="sneaker-image" />
    </div>
  );
};

export default Sneaker;
