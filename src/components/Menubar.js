import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';

const Menubar = () => {
  return (
    <nav className="menubar">
      <div className="menubar-logo">
        <Link to="/"><img src="images/menu4_icon.png" alt="Menu" /></Link>
      </div>
      <ul className="menubar-menu">
        <li><Link to="/"><img src="images/home2_icon.png" alt="Home" /></Link></li>
        <li><Link to="/schedule"><img src="images/cal2_icon.png" alt="Schedule" /></Link></li>
        <li><Link to="/find"><img src="images/map_icon.png" alt="Find" /></Link></li>
        <li><Link to="/chat"><img src="images/chat_icon.png" alt="Chat" /></Link></li>
        <li><Link to="/professors"><img src="images/doctor2_icon.png" alt="Professors" /></Link></li>
        <li><Link to="/test"><img src="images/list_icon.png" alt="Test" /></Link></li>
      </ul>
    </nav>
  );
};

export default Menubar;
