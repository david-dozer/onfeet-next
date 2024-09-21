import React from 'react';
import '../styles/styles.css';  // Link to custom CSS file for page-specific styles

const TryMe = () => {
  return (
    <div className="masthead">  {/* Apply masthead class for the background */}
      <div className="container d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="text-white-60 mx-auto mt-2 mb-5">Feel free to experiment here!</h2>
        </div>
      </div>

    </div>
  );
};

export default TryMe;

