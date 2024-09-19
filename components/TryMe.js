import React from 'react';
import '../styles/styles.css';  // Link to custom CSS file for page-specific styles

const TryMe = () => {
  return (
    <div className="masthead">  {/* Apply masthead class for the background */}
      <div className="container d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase">Welcome to the Try Me Page!</h1>
          <p>Feel free to experiment here!</p>
        </div>
      </div>
    </div>
  );
};

export default TryMe;

