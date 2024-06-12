import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopPage from './pages/TopPage';
import StreamerListPage from './pages/StreamerListPage';
import PlaylistPage from './pages/PlaylistPage';
import StreamDetailPage from './pages/StreamDetailPage';
import CategoryDetailPage from './pages/CategoryDetailPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/streamer" element={<StreamerListPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/stream/:id" element={<StreamDetailPage />} />
        <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
