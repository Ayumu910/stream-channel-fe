import React from 'react';
import styles from '../../styles/NavBar.module.css'

const GlobalNavBar: React.FC = () => {
  return (
    <nav className={styles["nav-bar"]}>
      <img className={styles['nav-bar__icon']} src={`${import.meta.env.BASE_URL}service-icon.png`} alt="Service Icon" />
      <input className={styles['nav-bar__search-form']} type="text" placeholder="Search stream" />
    </nav>
  );
};

export default GlobalNavBar;