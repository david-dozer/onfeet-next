"use client";

import { useState, useEffect } from 'react';
import ColorWheelComponent from './ColorWheel';

const Sidebar = ({ setSelectedPantsType, setAdjustedColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPantsType, setSelectedPantsTypeLocal] = useState('cargos');
  const [jeansColor, setJeansColor] = useState('blue');
  const [cargosColor, setCargosColor] = useState('grey');
  const [joggersColor, setJoggersColor] = useState('grey');

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePantsChange = (e) => {
    const newType = e.target.value;
    setSelectedPantsType(newType);
    setSelectedPantsTypeLocal(newType);
  };

  const handleJeansColorChange = (color) => {
    setJeansColor(color);
    setAdjustedColor(color === 'black' ? '#1a1919' : ''); // Dark grey for black jeans, original for blue
  };

  const handleCargosColorChange = (color) => {
    setCargosColor(color);
    setAdjustedColor(color === 'earthtone' ? '#5e5140' : color === 'black' ? '#000000' : ''); // Tan for earthtone, black for black
  };

  const handleJoggersColorChange = (color) => {
    setJoggersColor(color);
    setAdjustedColor(color === 'navy' ? '#09143d' : color === 'black' ? '#000000' : ''); // Navy for navy, black for black
  };

  // Set initial color based on selected pants type
  useEffect(() => {
    if (selectedPantsType === 'jeans') {
      setJeansColor('blue');
      setAdjustedColor(''); // Original image for blue
    } else if (selectedPantsType === 'cargos') {
      setCargosColor('grey');
      setAdjustedColor(''); // Original image for grey
    } else if (selectedPantsType === 'joggers') {
      setJoggersColor('grey');
      setAdjustedColor(''); // Original image for grey
    }
  }, [selectedPantsType, setAdjustedColor]);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle" onClick={toggleSidebar}>
        {isExpanded ? 'Collapse >' : '<'}
      </div>
      {isExpanded && (
        <div className="content">
          <h4>Bottoms</h4>
          <div className="pants-options">
            <label>
              <select value={selectedPantsType} onChange={handlePantsChange}>
                <option value="jeans">Jeans</option>
                <option value="cargos">Cargos</option>
                <option value="joggers">Joggers</option>
              </select>
            </label>

            {selectedPantsType === 'jeans' && (
              <div>
                <h5>Jeans Color Options</h5>
                <label>
                  <input 
                    type="radio" 
                    name="jeans-color" 
                    value="blue" 
                    checked={jeansColor === 'blue'} 
                    onChange={() => handleJeansColorChange('blue')} 
                  />
                  Blue
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="jeans-color" 
                    value="black" 
                    checked={jeansColor === 'black'} 
                    onChange={() => handleJeansColorChange('black')} 
                  />
                  Black
                </label>
              </div>
            )}

            {selectedPantsType === 'cargos' && (
              <div>
                <h5>Cargos Color Options</h5>
                <label>
                  <input 
                    type="radio" 
                    name="cargos-color" 
                    value="earthtone" 
                    checked={cargosColor === 'earthtone'} 
                    onChange={() => handleCargosColorChange('earthtone')} 
                  />
                  Earthtone
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="cargos-color" 
                    value="black" 
                    checked={cargosColor === 'black'} 
                    onChange={() => handleCargosColorChange('black')} 
                  />
                  Black
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="cargos-color" 
                    value="grey" 
                    checked={cargosColor === 'grey'} 
                    onChange={() => handleCargosColorChange('grey')} 
                  />
                  Grey
                </label>
              </div>
            )}

            {selectedPantsType === 'joggers' && (
              <div>
                <h5>Joggers Color Options</h5>
                <label>
                  <input 
                    type="radio" 
                    name="joggers-color" 
                    value="navy" 
                    checked={joggersColor === 'navy'} 
                    onChange={() => handleJoggersColorChange('navy')} 
                  />
                  Navy
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="joggers-color" 
                    value="black" 
                    checked={joggersColor === 'black'} 
                    onChange={() => handleJoggersColorChange('black')} 
                  />
                  Black
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="joggers-color" 
                    value="grey" 
                    checked={joggersColor === 'grey'} 
                    onChange={() => handleJoggersColorChange('grey')} 
                  />
                  Grey
                </label>
              </div>
            )}

            {selectedPantsType !== 'jeans' && (
              <div>
                <h5>Color Options</h5>
                <ColorWheelComponent 
                  onChangeAdjustedColor={setAdjustedColor} // Pass setAdjustedColor to ColorWheelComponent
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
