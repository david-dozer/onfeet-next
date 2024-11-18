"use client";  // Mark this file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import from next/navigation
import '../styles/styles.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 2) {
      try {
        const response = await fetch(`/api/sneakers?query=${e.target.value}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    } else {
      setProducts([]);
    }
  };

  const handleProductClick = async (product) => {
    // console.log('Product clicked:', product);
  
    // Send the product data to the API using the urlKey
    const response = await fetch(`/api/sneakers/${product.urlKey}`, {
      method: 'POST',  // POST to send the product data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),  // Send the full product data to the API
    });
  
    if (response.ok) {
      // Redirect to the shoe details page using urlKey instead of _id
      // console.log('Product posted successfully:', product); // Log the success message
      router.push(`/shoe/${product.urlKey}`);
    } else {
      console.error('Failed to send product data to the API');
    }
  };  

  return (
    <div className="search">
      <div className="container d-flex h-60 align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="text-white-60 mx-auto mt-2 mb-5">Search Sneakers</h2>
          <input
            type="text"
            placeholder="Search for sneakers..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control form-control-lg"
          />

          {/* Dropdown for showing products */}
          {searchTerm && products.length > 0 && (
            <div className="dropdown-menu show">
              {products.map((product, index) => (
                <div key={index} className="dropdown-item" onClick={() => handleProductClick(product)}>
                  <img src={product.thumbnail} alt={product.shoeName} className="thumbnail" />
                  <div className="product-info">
                    <h4>{product.make}</h4>
                    <p>{product.shoeName.replace(product.make, '')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;