import { useNavigate } from 'react-router-dom';

const PageLayout = ({ children, title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-all duration-200 mr-4"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Cube
          </button>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>

        {/* Content */}
        <div className="bg-white bg-opacity-10 rounded-xl p-8 text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout; 