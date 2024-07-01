import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import MyStreamerCategoriesPage from './pages/MyStreamerCategoriesPage';
import PlaylistPage from './pages/PlaylistPage';
import StreamDetailPage from './pages/StreamDetailPage';
import StreamerDetailPage from './pages/StreamerDetailPage';
import CategoryDetailPage from './pages/CategoryDetailPage'
import PlaylistDetailPage from './pages/PlaylistDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/streamer" element={<MyStreamerCategoriesPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/stream/:id" element={<StreamDetailPage />} />
        <Route path="/streamer/:streamerId" element={<StreamerDetailPage />} />
        <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
