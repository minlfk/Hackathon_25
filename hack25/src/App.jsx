import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import ChatButton from './components/ChatButton';
import ChatPage from './pages/ChatPage';
import FrontPage from './pages/FrontPage';
import PageLayout from './components/PageLayout';
import CubeDetail from './components/CubeDetail';

import './App.css'
import DeepDive from './pages/DeepDive';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/chat" element={<ChatPage />} />

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
        <div className="flex-1 text-center text-black no-underline fixed bottom-0 w-60 flex justify-between bg-white border-t border-gray-300 py-2">
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </Router>
    </>
  );
}

export default App;
