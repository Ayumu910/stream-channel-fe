import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import MyCategoryList from '../components/category/MyCategoryList';
import CategoryActionPane from '../components/category/CategoryActionPane';
import styles from '../styles/MyStreamerCategoriesPage.module.css';

const MyStreamerCategoriesPage: React.FC = () => {
  return (
    <AuthProvider>
      <div className={styles.pageContainer}>
        <GlobalNavBar />
        <div className={styles.contentContainer}>
          <SideMenu />
          <main className={styles.mainContent}>
            <MyCategoryList />
            <CategoryActionPane />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default MyStreamerCategoriesPage;