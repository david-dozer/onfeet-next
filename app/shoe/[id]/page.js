"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';  // Use usePathname to get the current URL pathname

const ShoeDetail = () => {
  const pathname = usePathname();  // Get the current pathname
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      // Extract the id from the URL
      const id = pathname?.split('/').pop(); // Extract the id from the pathname

      // Ensure that the id is valid
      if (!id) {
        setError('Invalid ID: could not extract ID from URL');
        return;
      }

      try {
        // Fetch the product data
        const response = await fetch(`/api/sneakers/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);  // Set the fetched product data in state
      } catch (err) {
        setError(err.message);
      }
    };

    // Only call fetchProduct when pathname is available
    if (pathname) {
      fetchProduct();
    }
  }, [pathname]);  // Effect runs when pathname changes

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.shoeName}</h1>
      <img src={product.thumbnail} alt={product.shoeName} />
      <p>{product.description}</p>
      <p>Brand: {product.make}</p>
      <p>Colorway: {product.colorway}</p>
      <p>Retail Price: ${product.retailPrice}</p>
      <p>Release Date: {product.releaseDate}</p>
      {/* Display more product details as needed */}
    </div>
  );
};

export default ShoeDetail;