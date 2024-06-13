import React, {useContext} from 'react';
import StreamList from '../stream/StreamList';
import RecommendedCategoryList from '../category/RecommendedCategoryList'
import RecommendedPlaylists from '../playlist/RecommendedPlaylists';
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
      <RecommendedCategoryList />
      <RecommendedPlaylists />
    </main>
  );
};

export default MainContainer;