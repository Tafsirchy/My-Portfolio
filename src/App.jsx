import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import './index.css';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </SmoothScroll>
    </Router>
  );
}

export default App;
