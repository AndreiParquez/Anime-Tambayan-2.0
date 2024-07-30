import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AnimePage from './components/anime';
import Anime from './components/anime copy';
import EpisodePage from './components/episode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/episode/:id/:episode_id" element={<EpisodePage />} />
      </Routes>
    </Router>
  );
}

export default App;
