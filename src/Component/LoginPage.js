import React, { useState } from 'react'
import { IoMdPerson } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaOpera } from "react-icons/fa6";
import { userLogin } from './Service/LoginService';
import axios from 'axios';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
    setApiError(''); // Clear API error when user makes changes
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setApiError('');
      
      try {
        const response = await userLogin({
          body: {
            username: formData.username,
            email: formData.email,
            password: formData.password
          }
        });

        // Handle successful login
        console.log('Login successful:', response);
        // Reset form
        setFormData({ username: '', email: '', password: '' });
        
        // Here you might want to:
        // - Store the token in localStorage
        // localStorage.setItem('token', response.token);
        // - Redirect to dashboard
        // - Update global auth state
        
      } catch (error) {
        console.error('Login error:', error);
        setApiError(
          error.response?.data?.message || 
          'An error occurred during login. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
    // Implement social login logic here
  };

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500'>
      <div className='bg-white w-[400px] flex flex-col items-center rounded-3xl shadow-lg p-8'>
        <h1 className='font-bold text-3xl text-gray-800 mb-8'>Login</h1>
        
        {apiError && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-gray-600 flex justify-start font-bold'>Username</label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <IoMdPerson />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder='Type your username'
                className={`w-full bg-gray-100 rounded-lg py-2 px-10 focus:outline-none ${errors.username ? 'border-red-500 border' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-gray-600 flex justify-start font-bold'>Email</label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <IoIosMail />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Type your email'
                className={`w-full bg-gray-100 rounded-lg py-2 px-10 focus:outline-none ${errors.email ? 'border-red-500 border' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-gray-600 flex justify-start font-bold'>Password</label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Type your password'
                className={`w-full bg-gray-100 rounded-lg py-2 px-10 focus:outline-none ${errors.password ? 'border-red-500 border' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            <div className='flex justify-end'>
              <a href="#" className='text-sm text-gray-500 hover:text-gray-700'>Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold 
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'} transition-opacity`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </button>

          <div className='text-center mt-4'>
            <p className='text-gray-600 mb-4'>Or Sign Up Using</p>
            <div className='flex justify-center gap-4'>
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className='w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity'
                disabled={isLoading}
              >
                <FaFacebook />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className='w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity'
                disabled={isLoading}
              >
                <FaTwitter />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('opera')}
                className='w-10 h-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:opacity-90 transition-opacity'
                disabled={isLoading}
              >
                <FaOpera />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
