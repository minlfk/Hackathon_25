import { useNavigate } from 'react-router-dom';
import CircularInterface from './CircularInterface';
import BottomToolbar from './BottomToolbar';
import logo from '../assets/zukunft-fabrik-logo.png'; // Import the logo

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gray-100">
      {/* Header */}
      <div className="w-full bg-white shadow-lg">
        <div className="w-full px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <img 
            src={logo} 
            alt="Zukunft-Fabrik" 
            className="h-8 md:h-10 lg:h-12" // Responsive height
          />
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="w-full h-[calc(100vh-4rem-4rem)] flex items-center justify-center">
        <CircularInterface />
      </div>

      {/* Bottom Toolbar */}
      <BottomToolbar />
    </div>
  );
};

export default UserDashboard; 