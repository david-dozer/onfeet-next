import React from 'react';
import '../styles/styles.css';

const Header = () => {
  return (
    <header className="masthead">
      <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h1 className="mx-auto my-0 text-uppercase">onFeet.</h1>
            <h2 className="text-white-50 mx-auto mt-2 mb-5">
              Giving you a better perspective on sneaker shopping.
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
