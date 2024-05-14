import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import MainContainer from '../components/layout/MainContainer';

const TopPage: React.FC = () => {

  return (
    <AuthProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <GlobalNavBar />
        <div style={{ display: 'flex' }}>
          <SideMenu />
          <MainContainer />
        </div>
      </div>
    </AuthProvider>

  );
};

export default TopPage;