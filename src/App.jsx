import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </MotionConfig>
  );
}

export default App;
