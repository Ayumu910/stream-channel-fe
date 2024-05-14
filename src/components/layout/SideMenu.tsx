import React, { useState, useContext } from 'react';
import AuthForm from '../auth/AuthForm';
import { AuthContext  } from '../../contexts/AuthContext'
import '../../styles/SideMenu.modules.css';

const SideMenu: React.FC = ( ) => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleOpenAuthForm = () => {
    setShowAuthForm(true);
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };

  return (
    <>
      <aside className="side-menu">

        <ul className="side-menu__list">
          <li className="side-menu__item">
            <a href="/" className="side-menu__link">Top</a>
          </li>
          <li className="side-menu__item">
            <a href="/streamer" className="side-menu__link">Streamer</a>
          </li>
          <li className="side-menu__item">
            <a href="/playlist" className="side-menu__link">Playlist</a>
          </li>
        </ul>

        {isLoggedIn ? (
            <button className='side-menu__logout-btn' onClick={handleLogout}>Logout</button>
        ) : (
            <button className='side-menu__signup-btn' onClick={handleOpenAuthForm}>Sign Up</button>
        )}
        </aside>

        {showAuthForm && (
          <div className="auth-form-overlay">
            <AuthForm onClose={handleCloseAuthForm} />
          </div>
        )}
    </>
  );
};

export default SideMenu;