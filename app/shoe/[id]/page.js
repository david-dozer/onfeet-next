// app/shoe/[id]/page.js
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';  // Use usePathname to get the current URL pathname
import SideBar from '../../../components/Sidebar';
import { ClipLoader } from "react-spinners"; //

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};

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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', 
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 35%)' }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', 
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 35%)' }}>
      <ClipLoader
          color="green" // Change this to your preferred loading color
          loading={!product} // Set loading state
          // cssOverride={override}
          size={150} // Adjust the size as needed
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={1}
        />
        <p>Loading...</p>
    </div>);
  }

  return (
    <div className="shoe-detail-container">
      <SideBar /> {/* Include the sidebar here */}
      <img 
        src="/pants/pants.png" // Path to the pants image in the public folder
        alt="Pants"
        className="fade-in pants-image" // Add class for styling
      />
      <img 
        src={product.thumbnail} 
        alt={product.shoeName} 
        className="fade-in shoe-image"
      />
      <p>{product.shoeName}</p>
      {/* <p>Retail Price: ${product.retailPrice}</p> */}
      {/* <p>Release Date: {product.releaseDate}</p> */}
    </div>
  );
  
};

export default ShoeDetail;
