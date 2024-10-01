"use client";

import { useState } from 'react';
import ColorWheelComponent from './ColorWheel'; // Import the Color Wheel Component

const Sidebar = ({ setSelectedPantsType }) => {  // Accept the setter as a prop
  const [isExpanded, setIsExpanded] = useState(true);  // set back to false when deployed
  const [color, setColor] = useState('#ffffff'); // Default color for pants
  const [selectedPantsType, setSelectedPantsTypeLocal] = useState('jeans');
  const [jeansColor, setJeansColor] = useState('blue'); // Default color for jeans
  const [cargosColor, setCargosColor] = useState('grey'); // Default color for cargos
  const [joggersColor, setJoggersColor] = useState('grey'); // Default color for joggers

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePantsChange = (e) => {
    const newType = e.target.value;
    setSelectedPantsType(newType);  // Update the parent component's state
    setSelectedPantsTypeLocal(newType);  // Update local state for rendering
  };

  const handleJeansColorChange = (e) => {
    setJeansColor(e.target.value); // Update the jeans color state
  };

  const handleCargosColorChange = (e) => {
    setCargosColor(e.target.value); // Update the cargos color state
  };

  const handleJoggersColorChange = (e) => {
    setJoggersColor(e.target.value); // Update the joggers color state
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle" onClick={toggleSidebar}>
        {isExpanded ? '>' : '<'}
      </div>
      {isExpanded && (
        <div className="content">
          <h4>Bottoms</h4>
          {/* Commenting out the checkbox group for pants */}
          {/* <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={isPantsChecked} 
                onChange={() => {
                  setIsPantsChecked(true);
                }} 
              />
              Pants
            </label>
          </div> */}

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
                    onChange={handleJeansColorChange} 
                  />
                  Blue
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="jeans-color" 
                    value="black" 
                    checked={jeansColor === 'black'} 
                    onChange={handleJeansColorChange} 
                  />
                  Black
                </label>
                
                {/* Add a brightness slider */}
                <h5>Brightness</h5>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={color.brightness} // Assuming you want to track brightness
                  onChange={(e) => setColor({...color, brightness: e.target.value})}
                />
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
                    onChange={handleCargosColorChange} 
                  />
                  Earthtone
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="cargos-color" 
                    value="black" 
                    checked={cargosColor === 'black'} 
                    onChange={handleCargosColorChange} 
                  />
                  Black
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="cargos-color" 
                    value="grey" 
                    checked={cargosColor === 'grey'} 
                    onChange={handleCargosColorChange} 
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
                    onChange={handleJoggersColorChange} 
                  />
                  Navy
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="joggers-color" 
                    value="black" 
                    checked={joggersColor === 'black'} 
                    onChange={handleJoggersColorChange} 
                  />
                  Black
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="joggers-color" 
                    value="grey" 
                    checked={joggersColor === 'grey'} 
                    onChange={handleJoggersColorChange} 
                  />
                  Grey
                </label>
              </div>
            )}

            {/* For other pants types (Cargos, Joggers) */}
            {selectedPantsType !== 'jeans' && (
              <div>
                <h5>Color Options</h5>
                <ColorWheelComponent onChangeColor={setColor} /> {/* Color Wheel for selected pants */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
