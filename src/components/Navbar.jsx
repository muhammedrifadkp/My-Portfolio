import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    // Close the menu if it's open
    closeMenu();

    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          <span className="logo-text">Portfolio</span>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        {/* Navigation links */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/projects"
              className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/features"
              className={`nav-link ${location.pathname === '/features' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
