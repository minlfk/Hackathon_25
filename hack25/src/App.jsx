import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import ChatButton from './components/ChatButton';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/" element={<Navigate to="/ldashboardogdashboardin" replace />} />
      </Routes>
      <ChatButton />
    </Router>
    
  );
}

export default App;
