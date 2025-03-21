import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import ChatPage from './components/ChatPage';
import Share from './components/Share';
import './App.css'
import DeepDive from './pages/DeepDive';
import TopicDetail from './components/TopicDetail';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/case-study" element={<div>Case Study Page</div>} />
          <Route path="/share" element={<Share />} />
          <Route path="/topic/:topic" element={<TopicDetail />} />

          {/* Default routes for other combinations */}
          <Route path="/:id1" element={<DeepDive />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
