import React, {useContext} from 'react';
import StreamList from '../stream/StreamList';
import StreamerList from '../StreamerList';
import Playlists from '../Playlists';
import '../../styles/MainConatiner.modules.css'
import { AuthContext } from '../../contexts/AuthContext';


const MainContainer: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

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