import React, { useState } from 'react';
import ColorWheel from '@uiw/react-color-wheel';
// import './ColorWheel.css';

const ColorWheelComponent = ({ onChangeColor }) => {
  const [color, setColor] = useState('#f0f0f0');
  const [brightness, setBrightness] = useState(100); 

  const handleChange = (newColor) => {
    setColor(newColor.hex);
    onChangeColor(newColor.hex); // Pass color back to Sidebar
  };

  const adjustBrightness = (color, brightness) => {
    const rgb = parseInt(color.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff; // Extract red
    const g = (rgb >> 8) & 0xff;  // Extract green
    const b = rgb & 0xff;         // Extract blue

    const newR = Math.min(255, Math.floor((r * brightness) / 100));
    const newG = Math.min(255, Math.floor((g * brightness) / 100));
    const newB = Math.min(255, Math.floor((b * brightness) / 100));

    return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
  };

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  // Adjust brightness function remains unchanged
  const adjustedColor = adjustBrightness(color, brightness);

  return (
    <div className="color-wheel-container">
      <ColorWheel color={color} onChange={handleChange} />
      <div style={{ 
        width: '30px', 
        height: '30px', 
        backgroundColor: adjustedColor, 
        border: '1px solid #fff', 
        marginTop: '10px' 
      }}></div> 
      {/* Updated to a square */}
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Flex container */}
        <label style={{ color: '#f8f9fa', marginRight: '5px' }}>Brightness:</label>
        <input 
            type="range" 
            min="0" 
            max="200" 
            value={brightness} 
            onChange={handleBrightnessChange} 
        />
        </div>
    </div>
    );
};

export default ColorWheelComponent;