import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';

const Menubar = () => {
  return (
    <nav className="menubar">
      <div className="menubar-logo">
        <Link to="/">Healthcare Inc.</Link>
      </div>
      <ul className="menubar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {/*<li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>*/}
      </ul>
    </nav>
  );
};

export default Menubar;
