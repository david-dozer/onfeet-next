"use client";

import { useState } from 'react';
import ColorWheelComponent from './ColorWheel';

const Sidebar = ({ setSelectedPantsType, setPantsColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [color, setColor] = useState('#ffffff');
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

  const handleJeansColorChange = (e) => {
    setJeansColor(e.target.value);
  };

  const handleCargosColorChange = (e) => {
    setCargosColor(e.target.value);
  };

  const handleJoggersColorChange = (e) => {
    setJoggersColor(e.target.value);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle" onClick={toggleSidebar}>
        {isExpanded ? '>' : '<'}
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

            {selectedPantsType !== 'jeans' && (
              <div>
                <h5>Color Options</h5>
                <ColorWheelComponent onChangeColor={setPantsColor} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
