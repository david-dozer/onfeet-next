"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SideBar from '../../../components/Sidebar';
import { ClipLoader } from "react-spinners";

const ShoeDetail = () => {
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [adjustedColor, setAdjustedColor] = useState(''); // New state for adjusted color
  const [coloredPantsSrc, setColoredPantsSrc] = useState(''); // Initialize state for colored pants image
  const [selectedPantsType, setSelectedPantsType] = useState('cargos');
  const [animationKey, setAnimationKey] = useState(0); 
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [pantsPosition, setPantsPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading delay

  useEffect(() => {
    // Set a timeout for 5 seconds to simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const urlKey = pathname?.split('/').pop();

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
        setProduct(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    if (pathname) {
      fetchProduct();
    }
  }, [pathname]);

  const handlePantsChange = (newType) => {
    setIsFadingOut(true); 
    setTimeout(() => {
      setSelectedPantsType(newType);
      setAdjustedColor(''); // Reset adjusted color to ensure origin
      setAnimationKey(prev => prev + 1); 
      setIsFadingOut(false);
    }, 750);
  };

  const pantsImageSrc = selectedPantsType === 'joggers'
  ? '/pants/joggers_refined.png'
  : selectedPantsType === 'cargos'
  ? '/pants/cargo_pants.png'
  : selectedPantsType === 'jeans'
  ? '/pants/jeans_refined1.png'
  : '';

  // Function to apply color to pants
  const applyColorToPants = (pantsImageSrc, adjustedColor) => {
    if (!adjustedColor) {
      setColoredPantsSrc(pantsImageSrc); // Use original image if no color is selected
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = pantsImageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.globalCompositeOperation = 'source-atop';
      ctx.globalAlpha = 0.5; // Set opacity for blending
      ctx.fillStyle = adjustedColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      setColoredPantsSrc(canvas.toDataURL());
    };
  };

  useEffect(() => {
    if (pantsImageSrc) {
      applyColorToPants(pantsImageSrc, adjustedColor);
    }
  }, [pantsImageSrc, adjustedColor]);

  // Handle mouse down event
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartDragPos({ x: e.clientX - pantsPosition.x, y: e.clientY - pantsPosition.y });
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPantsPosition({
        x: e.clientX - startDragPos.x,
        y: e.clientY - startDragPos.y,
      });
    }
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartDragPos({ x: touch.clientX - pantsPosition.x, y: touch.clientY - pantsPosition.y });
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (isDragging) {
      // e.preventDefault(); // Prevent default scrolling behavior
      const touch = e.touches[0];
      setPantsPosition({
        x: touch.clientX - startDragPos.x,
        y: touch.clientY - startDragPos.y,
      });
    }
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 35%)' }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 35%)' }}>
        <ClipLoader color="green" loading={isLoading || !product} size={125} aria-label="Loading Spinner" data-testid="loader" speedMultiplier={0.5} />
        <p>Loading...</p>
        <p>*Pants may not render correctly onFeet, feel free to drag the pants on screen for your best fit.</p>
      </div>
    );
  }

  return (
    <div 
      className="shoe-detail-container" 
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd}
    >
      <SideBar 
        setSelectedPantsType={handlePantsChange} 
        setAdjustedColor={setAdjustedColor} // Pass setAdjustedColor to SideBar
      />
      <img
        key={animationKey}
        src={coloredPantsSrc}
        alt={`${selectedPantsType.charAt(0).toUpperCase() + selectedPantsType.slice(1)} Image`}
        className={`fade-in pants-image ${isFadingOut ? 'fade-out' : ''} ${
          selectedPantsType === 'cargos' ? 'cargo-pants-image' : 
          selectedPantsType === 'joggers' ? 'jogger-pants-image' : 
          selectedPantsType === 'jeans' ? 'jeans-image' : ''
        }`}
        style={{ 
          left: `${pantsPosition.x}px`, 
          top: `${pantsPosition.y}px`, 
          position: 'absolute', 
          cursor: 'grab',
          touchAction: 'none'  // Prevent scrolling during drag 
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      
      <img
        src={product.thumbnail}
        alt={product.shoeName}
        className={`fade-in shoe-image ${isFadingOut ? 'fade-out' : ''}`}
      />
      {/* <p>{product.shoeName}</p> */}
    </div>
  );
};

export default ShoeDetail;