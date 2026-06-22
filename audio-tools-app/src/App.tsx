import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LFOEffects from './tools/LFOEffects';
import BiquadVisualizer from './tools/BiquadVisualizer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/lfo-effects" element={<LFOEffects />} />
        <Route path="/tools/biquad-visualizer" element={<BiquadVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
