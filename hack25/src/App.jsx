import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import ChatButton from './components/ChatButton';
import FrontPage from './pages/FrontPage';
import PageLayout from './components/PageLayout';
import CubeDetail from './components/CubeDetail';

import './App.css'

function App() {
  const [showCubeDetail, setShowCubeDetail] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        
        {/* Technology + Resources specific routes */}
        <Route path="/tech-resources/a" element={<div>Technology + Resources: Option A</div>} />
        <Route path="/tech-resources/b" element={<div>Technology + Resources: Option B</div>} />
        <Route path="/tech-resources/c" element={<div>Technology + Resources: Option C</div>} />
        <Route path="/tech-resources/d" element={<div>Technology + Resources: Option D</div>} />
        <Route path="/tech-resources/e" element={<div>Technology + Resources: Option E</div>} />
        <Route path="/tech-resources/f" element={<div>Technology + Resources: Option F</div>} />
        
        {/* Default routes for other combinations */}
        <Route path="/front" element={<div>Front Face Content</div>} />
        <Route path="/back" element={<div>Back Face Content</div>} />
        <Route path="/left" element={<div>Left Face Content</div>} />
        <Route path="/right" element={<div>Right Face Content</div>} />
        <Route path="/top" element={<div>Top Face Content</div>} />
        <Route path="/bottom" element={<div>Bottom Face Content</div>} />
      </Routes>
      <ChatButton />
    </Router>
    
  );
}

export default App;
