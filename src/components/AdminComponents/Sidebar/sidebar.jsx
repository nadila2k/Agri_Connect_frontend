import React, { useState, useEffect, useRef } from 'react';
import { FaSeedling, FaCog, FaChartBar } from 'react-icons/fa';
import { GiCorn } from 'react-icons/gi';
import ManageCrops from '../ManageCrops/managecrops'; 
import CropStatistics from '../CropStatics/cropstatistics';
import './Styles_Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const sidebarRef = useRef(null);

  const tabs = [
    { name: 'Analytics', icon: <FaChartBar /> },
    { name: 'Manage Crops', icon: <FaSeedling />, content: <ManageCrops /> },
    { name: 'Crop Statistics', icon: <GiCorn />, content:<CropStatistics/> },
    { name: 'Settings', icon: <FaCog /> },
    
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
