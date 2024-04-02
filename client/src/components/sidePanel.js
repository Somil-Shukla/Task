import React, { useState } from 'react';
import './sidePanel.css';
import QuestionForm from './mainChat';
import ChatApp from './history';
function SidePanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start with the sidebar open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="side-bar">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
        {/* Sidebar content */}
        Flable.Ai
        <div className='marcos'>
        <div className='div-btn'>MARCO </div>
        <div className='div-btn'>SOCIAL WATCH</div>
        <div className='div-btn'>WEB ANALYTICS </div>
        </div>
      </div>
      {/* Main content */}
      <div className='history'>
        <ChatApp />
      </div>
       <div className="main-content">
        {/* Button to toggle sidebar */}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? <img src="/images/burger-bar3.png"  alt="Collapse"/> : <img src="/images/burger-bar3.png"  alt='Expand'/>}
        </button>
        {/* <div className='history'> */}
        <QuestionForm />
        {/* </div> */}
        </div>
    
    </div>
  );
}

export default SidePanel;
