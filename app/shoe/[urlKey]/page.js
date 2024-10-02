// app/shoe/[urlKey]/page.js
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';  
import SideBar from '../../../components/Sidebar';
import { ClipLoader } from "react-spinners"; 

const ShoeDetail = () => {
  const pathname = usePathname();  
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [selectedPantsType, setSelectedPantsType] = useState('jeans');
  const [animationKey, setAnimationKey] = useState(0); // State to trigger fade-in
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out effect

  useEffect(() => {
    const fetchProduct = async () => {
      const urlKey = pathname?.split('/').pop(); // Extract shoeName from URL
  
      if (!urlKey) {
        setError('Invalid shoeName: could not extract shoeName from URL');
        return;
      }
  
      try {
        const response = await fetch(`/api/sneakers/${urlKey}`);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
  
        const data = await response.json();
        setProduct(data); // Store product data
      } catch (err) {
        setError(err.message);
      }
    };
  
    if (pathname) {
      fetchProduct();
    }
  }, [pathname]); // Re-fetch when pathname changes 

  const handlePantsChange = (newType) => {
    setIsFadingOut(true); // Start fade-out effect

    // Delay setting the new pants type to allow fade-out to complete
    setTimeout(() => {
      setSelectedPantsType(newType);
      setAnimationKey(prev => prev + 1); // Increment key to trigger animation
      setIsFadingOut(false); // End fade-out effect
    }, 750); // Adjust the timeout duration to match your fade-out animation duration
  };

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', 
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 35%)' }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', 
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 35%)' }}>
        <ClipLoader
          color="green" 
          loading={!product} 
          size={150} 
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
        <p>Loading...</p>
      </div>
    );
  }

  // Dynamically set the pants image based on selectedPantsType
  const pantsImageSrc = selectedPantsType === 'joggers'
    ? '/pants/joggers_refined.png'
    : selectedPantsType === 'cargos'
    ? '/pants/cargo_pants.png'
    : selectedPantsType === 'jeans'
    ? '/pants/jeans_refined1.png'
    : '';

  return (
    <div className="shoe-detail-container">
      <SideBar setSelectedPantsType={handlePantsChange} /> {/* Pass down the handler */}
      
      {/* Render selected pants type image dynamically with fade-out and fade-in effects */}
      <img 
        key={animationKey} // Use key to trigger animation
        src={pantsImageSrc} 
        alt={`${selectedPantsType.charAt(0).toUpperCase() + selectedPantsType.slice(1)} Image`} 
        className={`fade-in pants-image ${isFadingOut ? 'fade-out' : ''} ${
          selectedPantsType === 'cargos' ? 'cargo-pants-image' : 
          selectedPantsType === 'joggers' ? 'jogger-pants-image' : 
          selectedPantsType === 'jeans' ? 'jeans-image' : ''
        }`}
      />
      
      {/* Only render the shoe image */}
      <img 
        // key={animationKey} // Use the same key to trigger animation
        src={product.thumbnail} 
        alt={product.shoeName} 
        className={`fade-in shoe-image ${isFadingOut ? 'fade-out' : ''}`} 
      />
      <p>{product.shoeName}</p>
    </div>
  );
};

export default ShoeDetail;