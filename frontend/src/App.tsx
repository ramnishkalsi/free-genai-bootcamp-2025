import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import VocabularyGame from '@/components/VocabularyGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vocabulary" element={<VocabularyGame />} />
      </Routes>
    </Router>
  );
}

export default App;