import React from 'react';
import '../styles/styles.css';

const About = () => {
  return (
    <section className="about-section text-center" id="about">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-white-80 mb-4">About onFeet</h2>
            <p className="text-white-80">
              onFeet is on a mission to simplify sneaker shopping by bringing the mirror to you,
              enabling you to try on your wants and needs, seeing how they look, onFeet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
