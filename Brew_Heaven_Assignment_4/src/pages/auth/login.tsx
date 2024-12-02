import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(username, password);

    if (response.success) {
      if (response.isAdmin) {
        router.push('/admin'); // Navigate to admin page
        console.log('Redirecting to /admin'); // Debugging
      } else {
        console.log('Redirecting to /'); // Debugging
        router.push('/'); // Navigate to homepage
      }
    } else {
      setError('This user does not exist or the credentials are incorrect.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf3e0]">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-4xl font-semibold text-center text-[#6f4e37] mb-8">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#d4a373] text-gray-800 placeholder-gray-500"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#d4a373] text-gray-800 placeholder-gray-500"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6f4e37] text-white py-3 rounded-md font-semibold hover:bg-[#d4a373] transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{' '}
          <a href="/auth/signup" className="text-[#6f4e37] font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
