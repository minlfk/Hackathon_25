import { useNavigate } from 'react-router-dom';

const BackButton = ({ route = '/', onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(route);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: '#ffffff' }}
      className="fixed top-4 left-2 text-gray-600 hover:bg-gray-50 transition-all z-50 flex items-center gap-2 px-3 py-2 rounded-lg shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );
};

export default BackButton; 