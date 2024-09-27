// Sidebar.js
"use client";

import { useState } from 'react';
import { ChromePicker } from 'react-color'; // Using ChromePicker for color selection

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [color, setColor] = useState('#ffffff'); // Default color for shorts
  const [isShortsChecked, setIsShortsChecked] = useState(false); // Default to false for shorts
  const [isPantsChecked, setIsPantsChecked] = useState(true); // Default to true for pants
  const [selectedPantsType, setSelectedPantsType] = useState('jeans');
  const [selectedSocksColor, setSelectedSocksColor] = useState('white');

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleColorChange = (color) => {
    setColor(color.hex); // Update the color based on the color picker
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle" onClick={toggleSidebar}>
        {isExpanded ? '>' : '<'} {/* Change symbol based on state */}
      </div>
      {isExpanded && (
        <div className="content">
          <h4>Bottoms</h4>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={isShortsChecked} 
                onChange={() => {
                  setIsShortsChecked(true);
                  setIsPantsChecked(false);
                }} 
              />
              Shorts
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={isPantsChecked} 
                onChange={() => {
                  setIsShortsChecked(false);
                  setIsPantsChecked(true);
                }} 
              />
              Pants
            </label>
          </div>

          {isPantsChecked && (
            <div className="pants-options">
              <label>
                <select value={selectedPantsType} onChange={(e) => setSelectedPantsType(e.target.value)}>
                  <option value="jeans">Jeans</option>
                  <option value="cargos">Cargos</option>
                  <option value="joggers">Joggers</option>
                </select>
              </label>
              {selectedPantsType === 'joggers' && (
                <div>
                  <h5>Color Options</h5>
                  <label>
                    <input type="radio" name="jogger-color" value="earthstone" onChange={(e) => handleColorChange(e.target.value)} />
                    Earthstone
                  </label>
                  <label>
                    <input type="radio" name="jogger-color" value="black" onChange={(e) => handleColorChange(e.target.value)} />
                    Black
                  </label>
                  <label>
                    <input type="radio" name="jogger-color" value="navyblue" onChange={(e) => handleColorChange(e.target.value)} />
                    Navy Blue
                  </label>
                  <ChromePicker color={color} onChangeComplete={handleColorChange} />
                </div>
              )}
              {selectedPantsType === 'cargos' && (
                <div>
                  <h5>Color Options</h5>
                  <label>
                    <input type="radio" name="cargos-color" value="earthstone" onChange={(e) => handleColorChange(e.target.value)} />
                    Earthstone
                  </label>
                  <label>
                    <input type="radio" name="cargos-color" value="black" onChange={(e) => handleColorChange(e.target.value)} />
                    Black
                  </label>
                  <label>
                    <input type="radio" name="cargos-color" value="navyblue" onChange={(e) => handleColorChange(e.target.value)} />
                    Navy Blue
                  </label>
                  <ChromePicker color={color} onChangeComplete={handleColorChange} />
                </div>
              )}
              {selectedPantsType === 'jeans' && (
                <div>
                  <h5>Jeans Color Options</h5>
                  <label>
                    <input type="radio" name="jeans-color" value="lightblue" onChange={(e) => handleColorChange(e.target.value)} />
                    Light Blue
                  </label>
                  <label>
                    <input type="radio" name="jeans-color" value="darkblue" onChange={(e) => handleColorChange(e.target.value)} />
                    Dark Blue
                  </label>
                  <label>
                    <input type="radio" name="jeans-color" value="black" onChange={(e) => handleColorChange(e.target.value)} />
                    Black
                  </label>
                </div>
              )}
            </div>
          )}

          <h4>Socks</h4>
          <div className="socks-options">
            <label>
              <input type="checkbox" checked={selectedSocksColor === 'white'} onChange={() => setSelectedSocksColor('white')} /> White
            </label>
            <label>
              <input type="checkbox" checked={selectedSocksColor === 'black'} onChange={() => setSelectedSocksColor('black')} /> Black
            </label>
            <label>
              <input type="checkbox" checked={selectedSocksColor === 'no-show'} onChange={() => setSelectedSocksColor('no-show')} /> No Show
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
