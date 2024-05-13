import React from 'react';
import { useAuth } from "../hooks/useAuth";
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import MainContainer from '../components/layout/MainContainer';

const TopPage: React.FC = () => {
  //ログイン状態の確認
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <GlobalNavBar />
      <div style={{ display: 'flex' }}>
        <SideMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <MainContainer isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default TopPage;