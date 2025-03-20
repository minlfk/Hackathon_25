import { useNavigate } from 'react-router-dom';

const BottomToolbar = () => {
  const navigate = useNavigate();

  return (
    <div 
      style={{ backgroundColor: '#ffffff' }}
      className="fixed bottom-0 left-0 right-0 shadow-lg h-16 flex justify-center items-center z-80"
    >
      <div className="flex justify-between w-full max-w-screen-lg pl-2 pr-6 md:pl-4 md:pr-8">
      {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#ffffff' }}
          className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors h-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '26px', height: '26px' }}
            className="md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs md:text-sm mt-1">Home</span>
        </button>

        {/* Chat Button */}
        <button
          onClick={() => navigate('/chat')}
          style={{ backgroundColor: '#ffffff' }}
          className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors h-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '26px', height: '26px' }}
            className="md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-xs md:text-sm mt-1">Chat</span>
        </button>

        {/* Case Study Button */}
        <button
          onClick={() => navigate('/case-study')}
          style={{ backgroundColor: '#ffffff' }}
          className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors h-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '26px', height: '26px' }}
            className="md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-xs md:text-sm mt-1">CaseStudy</span>
        </button>

        {/* User Button */}
        <button
          onClick={() => navigate('/share')}
          style={{ backgroundColor: '#ffffff' }}
          className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors h-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '26px', height: '26px' }}
            className="md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
            />
          </svg>
          <span className="text-xs md:text-sm mt-1">Stories</span>
        </button>
      </div>
    </div>
  );
};

export default BottomToolbar; 