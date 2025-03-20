import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'example@email.com') {
      // Successful login
      navigate('/dashboard');
    } else {
      setError('Please use example@email.com with any password');
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-900 overflow-x-hidden m-0 p-0">
      {/* Left side with background and welcome message */}
      <div className="w-1/2 bg-blue-600 min-h-screen p-12 text-white flex flex-col relative">
        <div className="absolute top-12 left-12">
          <img src="/your-logo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex-grow flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-4">Hello, welcome!</h1>
          <p className="text-xl opacity-90 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi risus.
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 min-h-screen p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-8">
            <p className="text-center text-gray-600 mb-4">FOLLOW</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 