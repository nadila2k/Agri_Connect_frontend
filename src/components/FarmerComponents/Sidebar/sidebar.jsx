import React, { useState, useEffect, useRef } from 'react';
import { GiFarmTractor } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa';
import StartFarm from '../StartFarming/farm';
import classes from "./Styles_Sidebar.module.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const sidebarRef = useRef(null);

  const tabs = [
    { name: 'Start Farming', icon: <GiFarmTractor />, content: <StartFarm /> },
    { name: 'Manage Profile', icon: <FaUserCircle /> },
    { name: 'Start Farming', icon: <GiFarmTractor />, content: <StartFarm /> },
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
    <div className={classes.dashboardContainer}>
      <div ref={sidebarRef} className={`${classes.sidebar} ${isExpanded ? classes.expanded : ''}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={classes.sidebarTab}
            onClick={() => toggleSidebar(index)}
          >
            <div className={classes.icon}>{tab.icon}</div>
            {isExpanded && <span className={classes.label}>{tab.name}</span>}
          </div>
        ))}
      </div>
      <div className={classes.content}>
        {activeTab !== null && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Sidebar;

