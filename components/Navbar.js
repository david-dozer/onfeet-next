'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { animateScroll as scroll, scroller } from 'react-scroll';
import '../styles/styles.css';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/', undefined, { shallow: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.location.hash) {
      history.replaceState(null, null, ' ');
    }
  };
  
  const handleAboutClick = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, null, '#about-section');
      }
    } else {
      router.push('/#about-section', undefined, { shallow: true });
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Navbar shrink function
    const navbarShrink = () => {
      const navbar = document.querySelector('#mainNav');
      if (!navbar) return;
      if (window.scrollY === 0) {
        navbar.classList.remove('navbar-shrink');
      } else {
        navbar.classList.add('navbar-shrink');
      }
    };

    window.addEventListener('scroll', navbarShrink);
    navbarShrink(); // Initial check

    return () => window.removeEventListener('scroll', navbarShrink);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container px-4 px-lg-5">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand" onClick={scrollToTop}>onFeet</a>
        </Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="nav-link" onClick={handleAboutClick} style={{ cursor: 'pointer' }}>ABOUT</span>
            </li>
            <li className="nav-item">
              <Link href="/try-me" legacyBehavior>
                <a className="nav-link">EXPLORE</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;