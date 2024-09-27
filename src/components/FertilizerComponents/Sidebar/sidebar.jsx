import React, { useState, useEffect, useRef } from 'react';
import { FaListAlt, FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Listings from '../Listings/listings';
import ProfileManager from '../../Profile/profileManager';
import LogoutButton from '../../Logout/logout';
import './Styles_Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const sidebarRef = useRef(null);

  const tabs = [
    { name: 'Manage Profile', icon: <FaUserCircle />, content: <ProfileManager /> },
    { name: 'Manage Items', icon: <FaListAlt />, content:<Listings/>},
    { name: 'Logout', icon: <FiLogOut />, content: < LogoutButton/> },
  ];

  const toggleSidebar = (index) => {
    setIsExpanded(!isExpanded);
    setActiveTab(index);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div ref={sidebarRef} className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="sidebar-tab"
            onClick={() => toggleSidebar(index)}
          >
            <div className="icon">{tab.icon}</div>
            {isExpanded && <span className="label">{tab.name}</span>}
          </div>
        ))}
      </div>
      <div className="content">
        {activeTab !== null && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Sidebar;
