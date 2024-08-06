import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import MyStreamerCategoriesPage from './pages/MyStreamerCategoriesPage';
import MyPlaylistsPage from './pages/MyPlaylistsPage';
import StreamDetailPage from './pages/StreamDetailPage';
import StreamerDetailPage from './pages/StreamerDetailPage';
import CategoryDetailPage from './pages/CategoryDetailPage'
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import StreamerForumPage from './pages/StreamerForumPage';
import StreamerAnalysisPage from './pages/StreamerAnalysisPage';

function App() {
  return (
    <Router basename='/stream-channel-fe'>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/streamer" element={<MyStreamerCategoriesPage />} />
        <Route path="/playlist" element={<MyPlaylistsPage />} />
        <Route path="/stream/:id" element={<StreamDetailPage />} />
        <Route path="/streamer/:streamerId" element={<StreamerDetailPage />} />
        <Route path="/streamer/:streamerId/forum" element={<StreamerForumPage />} />
        <Route path="/streamer/:streamerId/analysis" element={<StreamerAnalysisPage />} />
        <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
