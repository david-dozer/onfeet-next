// app/shoe/[id]/page.js
"use client";

"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';  // Use usePathname to get the current URL pathname

const ShoeDetail = () => {
  const pathname = usePathname();  // Get the current pathname
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [imageWithBgRemoved, setImageWithBgRemoved] = useState(null); // State to store image with background removed

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

        // Once the product is fetched, automatically remove the background
        await handleRemoveBackground(data.thumbnail);
      } catch (err) {
        setError(err.message);
      }
    };

    // Only call fetchProduct when pathname is available
    if (pathname) {
      fetchProduct();
    }
  }, [pathname]);  // Effect runs when pathname changes

  const handleRemoveBackground = async (imageUrl) => {
    try {
      const response = await fetch('http://localhost:5000/remove-bg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to remove background");

      const data = await response.json();
      setImageWithBgRemoved(data.output_image);  // Use the fixed path
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="shoe-detail-container">
      <h1>{product.shoeName}</h1>
      {imageWithBgRemoved ? (
        <img 
          src={imageWithBgRemoved} 
          alt={product.shoeName} 
          className="shoe-image"
        />
      ) : (
        <img 
          src={product.thumbnail} 
          alt={product.shoeName} 
          className="shoe-image"
        />
      )}
      <p>Retail Price: ${product.retailPrice}</p>
      <p>Release Date: {product.releaseDate}</p>
    </div>
  );
};

export default ShoeDetail;

