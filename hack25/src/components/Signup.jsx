import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with background and welcome message */}
      <div className="w-1/2 bg-blue-600 p-12 text-white flex flex-col">
        <div className="mb-8">
          <img src="/your-logo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">Create account</h1>
          <p className="text-xl opacity-90">
            Join us today and get access to all our features.
          </p>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="w-1/2 p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSignup} className="space-y-6">
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
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup; 