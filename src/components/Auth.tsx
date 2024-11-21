import { useState } from 'react';
import { MessageSquare, User, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../store';

export default function Auth() {
  const { register, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const DEFAULT_PROFILE_PICTURE =
    'https://www.redditstatic.com/avatars/avatar_default_02_FF8717.png';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowConfirmation(false);

    if (!username.trim() || !password.trim() || (!isLogin && !confirmPassword.trim())) {
      setError('All fields are required');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      let success;
      if (isLogin) {
        success = await login(username.trim(), password);
        if (!success) setError('Invalid username or password');
      } else {
        success = await register(
          username.trim(),
          password,
          DEFAULT_PROFILE_PICTURE
        );
        if (!success) setError('Username already exists');
        else {
          setShowConfirmation(true);
          setIsLogin(true);
          setError('Registration successful! Please login.');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <MessageSquare className="w-16 h-16 text-orange-400 mx-auto" />
          <h1 className="text-4xl font-bold mt-4">Welcome to Xeddit</h1>
          <p className="text-gray-400 mt-2">Share your thoughts with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 border border-gray-700 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 border border-gray-700 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 px-3 py-2 border border-gray-700 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <p className={`text-sm ${error.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                {error}
              </p>
            )}

            {showConfirmation && (
              <div className="flex items-center text-green-400 text-sm space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Registration successful! Please login.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setShowConfirmation(false);
              }}
              className="w-full text-gray-400 hover:text-gray-300 transition-colors text-sm"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
