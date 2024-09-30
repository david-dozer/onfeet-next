"use client";

import { useState } from 'react';
import ColorWheelComponent from './ColorWheel'; // Import the Color Wheel Component

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);  // set back to false when deployed
  const [color, setColor] = useState('#ffffff'); // Default color for shorts
  const [isShortsChecked, setIsShortsChecked] = useState(false); // Default to false for shorts
  const [isPantsChecked, setIsPantsChecked] = useState(true); // Default to true for pants
  const [selectedPantsType, setSelectedPantsType] = useState('joggers');
  const [selectedSocksColor, setSelectedSocksColor] = useState('white');

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle" onClick={toggleSidebar}>
        {isExpanded ? '>' : '<'}
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

          {isShortsChecked && (
            <div>
              <h5>Color Options</h5>
              <ColorWheelComponent onChangeColor={setColor} /> {/* Color Wheel for Shorts */}
            </div>
          )}

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
                    <input type="radio" name="jogger-color" value="earthstone" onChange={() => setColor('earthstone')} />
                    Earthtone
                  </label>
                  <label>
                    <input type="radio" name="jogger-color" value="black" onChange={() => setColor('black')} />
                    Black
                  </label>
                  <label>
                    <input type="radio" name="jogger-color" value="navyblue" onChange={() => setColor('navyblue')} />
                    Navy Blue
                  </label>
                  <ColorWheelComponent onChangeColor={setColor} /> {/* Color Wheel for Joggers */}
                </div>
              )}
              {selectedPantsType === 'cargos' && (
                <div>
                  <h5>Color Options</h5>
                  <label>
                    <input type="radio" name="cargos-color" value="earthstone" onChange={() => setColor('earthstone')} />
                    Earthstone
                  </label>
                  <label>
                    <input type="radio" name="cargos-color" value="black" onChange={() => setColor('black')} />
                    Black
                  </label>
                  <label>
                    <input type="radio" name="cargos-color" value="navyblue" onChange={() => setColor('navyblue')} />
                    Navy Blue
                  </label>
                  <ColorWheelComponent onChangeColor={setColor} /> {/* Color Wheel for Cargos */}
                </div>
              )}
              {selectedPantsType === 'jeans' && (
                <div>
                  <h5>Jeans Color Options</h5>
                  <label>
                    <input type="radio" name="jeans-color" value="lightblue" onChange={() => setColor('lightblue')} />
                    Light Blue
                  </label>
                  <label>
                    <input type="radio" name="jeans-color" value="darkblue" onChange={() => setColor('darkblue')} />
                    Dark Blue
                  </label>
                  <label>
                    <input type="radio" name="jeans-color" value="black" onChange={() => setColor('black')} />
                    Black
                  </label>
                  <ColorWheelComponent onChangeColor={setColor} /> {/* Color Wheel for Jeans */}
                </div>
              )}
            </div>
          )}

          {/* Show Socks selection only if Joggers or Shorts are selected */}
          {(isShortsChecked || selectedPantsType === 'joggers') && (
            <div>
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
      )}
    </div>
  );
};

export default Sidebar;
