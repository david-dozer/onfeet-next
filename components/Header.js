'use client';

import React, { useEffect } from 'react';
import Typed from 'typed.js'; // Import Typed.js
import '../styles/styles.css';

const Header = () => {
  useEffect(() => {
    const options = {
      strings: ["Spending too much time in the mirror?", "Try on your favorite shoes with onFeet.",
        "Giving you a better perspective on sneaker shopping."
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 3000,
      loop: true,
      showCursor: false, // Disable Typed.js default cursor
    };

    // Initialize Typed.js
    const typed = new Typed('.typed-text', options);

    // Cleanup on component unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header className="masthead">
      <div className="container px-4 px-lg-5 d-flex h-85 align-items-center justify-content-center">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h1 className="fade-in mx-auto my-0 text-uppercase">onFeet.</h1>
            <h2 className="text-white-50 mx-auto mt-2 mb-5 typed-text"></h2> {/* Use the class for Typed.js */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
