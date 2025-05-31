"use client";
import React from 'react';
import './Dropdown.css';
import Link from 'next/link';

const Dropdown = ({ activeDropdown, isMobile, setActiveDropdown, activeNavItem }) => {
  const allSectionsContent = [
    {
      id: 'marketing',
      title: "Marketing",
      items: [
        { name: "Best CRM Software", link: "/BestCRMSoftware" },
        { name: "Best Email Marketing Services", link: "/EmailMarketing" },
        { name: "Best Website Building Platforms", link: "/BestWebsiteBuildingPlatform" }
      ]
    },
    {
      id: 'technology',
      title: "Technology",
      items: [
        { name: "Business Phone Systems", link: "/phone-systems" },
        { name: "GPS Fleet Management Software", link: "/GpsFleetMangement" },
        { name: "Best Employee Management Software", link: "/BestEmployeeMangementSoftware" },
        { name: "Best Payroll System", link: "/BestPayrollSystem" }
      ]
    },
    {
      id: 'blog',
      title: "Resources",
      items: [
        { name: "WhitePaper", link: "/WhitePaper" },
        { name: "Blogs", link: "https://blogs.compare-bazaar.com/" }
      ]
    },
    {
      id: 'sales',
      title: "Sales",
      items: [
        { name: "Best CRM Software", link: "/BestCRMSoftware" },
        { name: "Best Call Center Management Software", link: "/Callcenter" },
        { name: "Best Project Management Software", link: "/BestProjectManagement" }
      ]
    },
    {
      id: 'contact',
      title: "Contact Us",
      items: [
        { name: "Contact", link: "/contact-sales" },
        { name: "About us", link: "/About us" },
        { name: "Careers", link: "/Careers" }
      ]
    }
  ];

  return (
    <>
      {!isMobile && activeDropdown && (
        <div className="mega-dropdown" onMouseLeave={() => setActiveDropdown(null)}>
          <div className="mega-dropdown-inner">
            <div className="mega-dropdown-sections">
              {allSectionsContent.map((section) => (
                <div 
                  key={section.id} 
                  className={`mega-dropdown-section ${
                    activeNavItem === section.id ? 'active-section-group' : ''
                  }`}
                >
                  <h3 className={`mega-dropdown-title ${
                    activeNavItem === section.id ? 'active-section' : ''
                  }`}>
                    {section.title}
                  </h3>
                  <ul className="mega-dropdown-items">
                    {section.items.map((item) => (
                      <li key={item.link}>
                        <Link 
                          href={item.link} 
                          className={`mega-dropdown-item ${
                            activeNavItem === section.id ? 'active-item' : ''
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;