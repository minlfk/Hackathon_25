import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      {/* Header */}
      <div className="w-full bg-white shadow-lg">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">example@email.com</span>
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-6">
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 text-lg">
            This is a generic dashboard page. You can add your content here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 