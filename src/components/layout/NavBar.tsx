import React from 'react';
import '../../styles/NavBar.modules.css'

const GlobalNavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <img className='nav-bar__icon' src="service-icon.png" alt="Service Icon" />
      <input className='nav-bar__search-form' type="text" placeholder="Search stream" />
    </nav>
  );
};

export default GlobalNavBar;