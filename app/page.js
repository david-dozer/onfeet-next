import React from 'react';
import Header from "../components/Header";
import About from "../components/About";

export default function Home() {
  return (
    <main>
      <Header />
      <div id="about-section">
        <About />
      </div>
      {/* Add any other components specific to the home page */}
    </main>
  );
}