// MainContainer.tsx
import React from 'react';
import StreamList from '../StreamList';
import StreamerList from '../StreamerList';
import Playlists from '../Playlists';
import '../../styles/MainConatiner.modules.css'

interface MainContainerProps {
  isLoggedIn: boolean;
}

const MainContainer: React.FC<MainContainerProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div className='require-login-message'>ログインしてください</div>;
  }

  return (
    <main>
      <StreamList />
      <StreamerList />
      <Playlists />
    </main>
  );
};

export default MainContainer;