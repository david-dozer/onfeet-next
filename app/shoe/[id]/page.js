"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';  // Use next/navigation for search params

const ShoeDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();  // Use search params to extract the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      // Extract the id from the URL directly
      const pathname = router.pathname;
      console.log(pathname);
      const id = searchParams.get('id'); // Get the last part of the URL

      if (id) {
        try {
          const response = await fetch(`/api/sneakers/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product data');
          }
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchProduct();
  }, [router]);

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
      {/* You can display more product details here */}
    </div>
  );
};

export default ShoeDetail;
