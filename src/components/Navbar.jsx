"use client";
import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import './Navbar.css';
import Link from 'next/link'; // Correct import

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [persistentActiveNavItem, setPersistentActiveNavItem] = useState(null);
  const navbarRef = useRef(null);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);

      // Close mobile menu if switching to desktop
      if (!newIsMobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        // Don't reset persistentActiveNavItem when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle dropdown toggling
  const handleDropdownToggle = (dropdown) => {
    if (isMobile) {
      // In mobile, toggle the dropdown
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    } else {
      // In desktop, set the active dropdown
      setActiveDropdown(dropdown);
    }
  };

  // Handle nav item clicking
  const handleNavItemClick = (item) => {
    // Update both active and persistent states
    setActiveNavItem(item);
    setPersistentActiveNavItem(prevItem => prevItem === item ? null : item);

    if (item === 'home') {
      // Home has no dropdown, close any open dropdown
      setActiveDropdown(null);
    } else if (isMobile) {
      // On mobile, toggle the dropdown
      handleDropdownToggle(item);
    } else {
      // On desktop, always open the dropdown on click
      setActiveDropdown(item);
    }

    // If mobile and clicking a nav item, don't close the menu
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Handle mouse enter for desktop hover effect
  const handleMouseEnter = (dropdown) => {
    if (!isMobile) {
      setActiveDropdown(dropdown);
      setActiveNavItem(dropdown);
    }
  };

  // Handle mouse leave for desktop
  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
      // Reset activeNavItem but keep persistentActiveNavItem
      setActiveNavItem(persistentActiveNavItem);
    }
  };

  // Determine if a nav item should be shown as active
  const isNavItemActive = (item) => {
    return item === activeNavItem || item === persistentActiveNavItem;
  };

  return (
    <div 
      ref={navbarRef} 
      onMouseLeave={handleMouseLeave}
    >
      <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
        {/* Main Navigation */}
        <div className="navbar-inner">
          <div className="navbar-content">
            {/* Logo */}
            <div className="navbar-logo">
              <a href="/" className="logo-link">
                <div className="logo-text">
                  <div className="nav-img">
                    <img src="/ICON2.PNG" alt="Description" className="w-20 h-15 ml-1 rounded-lg" />
                  </div>
                  <img 
                    src="/images/icon1new.png" 
                    alt="Logo" 
                    className="h-30 w-50 -ml-1 object-contain mx-2 transition-transform hover:scale-105" 
                  />
                </div>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">
              {/* Home */}
              <div className="nav-item-container">
                <Link
                  href="/"
                  className={`nav-item ${isNavItemActive('home') ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('home')}
                  onMouseEnter={() => handleMouseEnter('home')}
                >
                  Home
                </Link>
              </div>

              {/* Marketing */}
              <div className="nav-item-container">
                <Link
                  href="#"
                  className={`nav-item ${isNavItemActive('marketing') ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('marketing')}
                  onMouseEnter={() => handleMouseEnter('marketing')}
                >
                  Marketing
                  <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>
              </div>

              {/* Technology */}
              <div className="nav-item-container">
                <Link
                  href="#"
                  className={`nav-item ${isNavItemActive('technology') ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('technology')}
                  onMouseEnter={() => handleMouseEnter('technology')}
                >
                  Technology
                  <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>
              </div>

              {/* Resources */}
              <div className="nav-item-container">
                <Link
                  href="#"
                  className={`nav-item ${isNavItemActive('blog') ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('blog')}
                  onMouseEnter={() => handleMouseEnter('blog')}
                >
                  Resources
                  <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>
              </div>

              {/* Sales */}
              <div className="nav-item-container">
                <Link
                  href="#"
                  className={`nav-item ${isNavItemActive('sales') ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('sales')}
                  onMouseEnter={() => handleMouseEnter('sales')}
                >
                  Sales
                  <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>
              </div>

              {/* Contact Us */}
              <div className="nav-item-container">
                <Link
                  href="#"
                  className={`nav-item ${isNavItemActive('contact') ? 'active' : ''}`}
                  onClick={() => handleNavItemClick('contact')}
                  onMouseEnter={() => handleMouseEnter('contact')}
                >
                  Contact Us
                  <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className={`mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
          <div className="mobile-menu-inner">
            {/* Home */}
            <div className="mobile-menu-item">
              <Link
                href="/"
                className={`mobile-menu-button-item ${isNavItemActive('home') ? 'active' : ''}`}
                onClick={() => {
                  handleNavItemClick('home');
                  setMobileMenuOpen(false);
                }}
              >
                <span className={`mobile-menu-text ${isNavItemActive('home') ? 'mobile-menu-text-blue' : ''}`}>
                  Home
                </span>
              </Link>
            </div>
            
            {/* Marketing */}
            <div className="mobile-menu-item">
              <button
                className={`mobile-menu-button-item ${isNavItemActive('marketing') ? 'active' : ''}`}
                onClick={() => handleNavItemClick('marketing')}
              >
                <span className={`mobile-menu-text ${isNavItemActive('marketing') ? 'mobile-menu-text-blue' : ''}`}>
                  Marketing
                </span>
                <svg className={`mobile-dropdown-arrow ${activeDropdown === 'marketing' ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'marketing' && (
                <div className="mobile-dropdown-content">
                  <div className="mobile-dropdown-category">
                    <ul className="category-items">
                      <li><Link href="/BestCRMSoftware" className="category-item-link">Best CRM Software</Link></li>
                      <li><Link href="/EmailMarketing" className="category-item-link">Best Email Marketing Services</Link></li>
                      <li><Link href="/BestWebsiteBuildingPlatform" className="category-item-link">Best Website Building Platform</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Technology */}
            <div className="mobile-menu-item">
              <button
                className={`mobile-menu-button-item ${isNavItemActive('technology') ? 'active' : ''}`}
                onClick={() => handleNavItemClick('technology')}
              >
                <span className={`mobile-menu-text ${isNavItemActive('technology') ? 'mobile-menu-text-blue' : ''}`}>
                  Technology
                </span>
                <svg className={`mobile-dropdown-arrow ${activeDropdown === 'technology' ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'technology' && (
                <div className="mobile-dropdown-content">
                  <div className="mobile-dropdown-category">
                    <ul className="category-items">
                      <li><Link href="/phone-systems" className="category-item-link">Business Phone System</Link></li>
                      <li><Link href="/GpsFleetMangement" className="category-item-link">GPS Fleet Management Software</Link></li>
                      <li><Link href="/BestEmployeeMangementSoftware" className="category-item-link">Best Employee Management Software</Link></li>
                      <li><Link href="/BestPayrollSystem" className="category-item-link">Best Payroll System</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div className="mobile-menu-item">
              <button
                className={`mobile-menu-button-item ${isNavItemActive('blog') ? 'active' : ''}`}
                onClick={() => handleNavItemClick('blog')}
              >
                <span className={`mobile-menu-text ${isNavItemActive('blog') ? 'mobile-menu-text-blue' : ''}`}>
                  Resources
                </span>
                <svg className={`mobile-dropdown-arrow ${activeDropdown === 'blog' ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'blog' && (
                <div className="mobile-dropdown-content">
                  <div className="mobile-dropdown-category">
                    <ul className="category-items">
                      <li><Link href="/WhitePaper" className="category-item-link">WhitePaper</Link></li>
                      <li><a href="https://blogs.compare-bazaar.com/" className="category-item-link" target="_blank" rel="noopener noreferrer">Blogs</a></li>
                    </ul>
                  </div>
                </div>   
              )}
            </div>

            {/* Sales */}
            <div className="mobile-menu-item">
              <button
                className={`mobile-menu-button-item ${isNavItemActive('sales') ? 'active' : ''}`}
                onClick={() => handleNavItemClick('sales')}
              >
                <span className={`mobile-menu-text ${isNavItemActive('sales') ? 'mobile-menu-text-blue' : ''}`}>
                  Sales
                </span>
                <svg className={`mobile-dropdown-arrow ${activeDropdown === 'sales' ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'sales' && (
                <div className="mobile-dropdown-content">
                  <div className="mobile-dropdown-category">
                    <ul className="category-items">
                      <li><Link href="/BestCRMSoftware" className="category-item-link">Best CRM Software</Link></li>
                      <li><Link href="/Callcenter" className="category-item-link">Best Call Center Management Software</Link></li>
                      <li><Link href="/BestProjectManagement" className="category-item-link">Best Project Management Software</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <div className="mobile-menu-item">
              <button
                className={`mobile-menu-button-item ${isNavItemActive('contact') ? 'active' : ''}`}
                onClick={() => handleNavItemClick('contact')}
              >
                <span className={`mobile-menu-text ${isNavItemActive('contact') ? 'mobile-menu-text-blue' : ''}`}>
                  Contact Us
                </span>
                <svg className={`mobile-dropdown-arrow ${activeDropdown === 'contact' ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'contact' && (
                <div className="mobile-dropdown-content">
                  <div className="mobile-dropdown-category">
                    <ul className="category-items">
                      <li><Link href="/contact-sales" className="category-item-link">Contact</Link></li>
                      <li><Link href="/About us" className="category-item-link">About</Link></li>
                      <li><Link href="/Careers" className="category-item-link">Career</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Dropdowns */}
      {!isMobile && (
        <Dropdown
          activeDropdown={activeDropdown}
          isMobile={isMobile}
          setActiveDropdown={setActiveDropdown}
          activeNavItem={persistentActiveNavItem || activeNavItem}
        />
      )}
    </div>
  );
};

export default Navbar;