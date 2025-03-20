import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import ChatPage from './components/ChatPage';
import Share from './components/Share';

import './App.css'
import DeepDive from './pages/DeepDive';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/case-study" element={<div>Case Study Page</div>} />
          <Route path="/share" element={<Share />} />

          {/* Technology + Resources specific routes */}
          <Route path="/tech-resources/a" element={<div>Technology + Resources: Option A</div>} />
          <Route path="/tech-resources/b" element={<div>Technology + Resources: Option B</div>} />
          <Route path="/tech-resources/c" element={<div>Technology + Resources: Option C</div>} />
          <Route path="/tech-resources/d" element={<div>Technology + Resources: Option D</div>} />
          <Route path="/tech-resources/e" element={<div>Technology + Resources: Option E</div>} />
          <Route path="/tech-resources/f" element={<div>Technology + Resources: Option F</div>} />

          {/* Default routes for other combinations */}
          <Route path="/:id1/:id2/:id3" element={<DeepDive />} />
          <Route path="/front" element={<div>Front Face Content</div>} />
          <Route path="/back" element={<div>Back Face Content</div>} />
          <Route path="/left" element={<div>Left Face Content</div>} />
          <Route path="/right" element={<div>Right Face Content</div>} />
          <Route path="/top" element={<div>Top Face Content</div>} />
          <Route path="/bottom" element={<div>Bottom Face Content</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
