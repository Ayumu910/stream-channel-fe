import React, { useState, useContext } from 'react';
import AuthForm from '../auth/AuthForm';
import { AuthContext  } from '../../contexts/AuthContext'
import styles from '../../styles/SideMenu.module.css';

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
      <aside className={styles["side-menu"]}>

        <ul className={styles["side-menu__list"]}>
          <li className={styles["side-menu__item"]}>
            <a href="/" className={styles["side-menu__link"]}>Top</a>
          </li>
          <li className={styles["side-menu__item"]}>
            <a href="/streamer" className={styles["side-menu__link"]}>Streamer</a>
          </li>
          <li className={styles["side-menu__item"]}>
            <a href="/playlist" className={styles["side-menu__link"]}>Playlist</a>
          </li>
        </ul>

        {isLoggedIn ? (
            <button className={styles['side-menu__logout-btn']} onClick={handleLogout}>Logout</button>
        ) : (
            <button className={styles['side-menu__signup-btn']} onClick={handleOpenAuthForm}>Sign Up</button>
        )}
        </aside>

        {showAuthForm && (
          <div className={styles["auth-form-overlay"]}>
            <AuthForm onClose={handleCloseAuthForm} />
          </div>
        )}
    </>
  );
};

export default SideMenu;