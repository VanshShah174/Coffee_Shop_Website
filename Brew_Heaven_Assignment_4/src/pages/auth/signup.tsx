import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '../../api/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordComment, setPasswordComment] = useState('');
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    updatePasswordStrength(newPassword);
  };

  const updatePasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength += 0.5;
    if (/[A-Z]/.test(password)) strength += 0.25;
    if (/[0-9]/.test(password)) strength += 0.25;
    if (/[!@#$%^&*]/.test(password)) strength += 0.25;

    strength = Math.min(strength, 1);
    setPasswordStrength(strength);

    if (strength === 1) {
      setPasswordComment('Strong password');
    } else if (strength >= 0.5) {
      setPasswordComment('Moderate password');
    } else {
      setPasswordComment('Weak password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3 || username.length > 40) {
      setError('Username must be between 3 and 40 characters.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setError('');

    try {
      const response = await AuthService.signup(username, password);
      if (response.success) {
        alert('Account created! You can now log in.');
        router.push('/auth/login');
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf3e0]">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-4xl font-semibold text-center text-[#6f4e37] mb-8">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#d4a373] text-gray-800 placeholder-gray-500"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
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
          <p
            className={`text-center mt-1 ${
              passwordStrength === 1 ? 'text-green-600' : passwordStrength >= 0.5 ? 'text-yellow-500' : 'text-red-500'
            }`}
          >
            {passwordComment}
          </p>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/auth/login" className="text-[#6f4e37] font-semibold hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
