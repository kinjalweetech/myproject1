import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/AuthSlice'
import { userLogin } from './Service/LoginService'

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await userLogin(formData);
      dispatch(setUser({ email: formData.email }));
      const from = location.state?.from?.pathname || '/home';
      navigate(from);
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-purple-50'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-md mx-auto bg-white rounded-xl shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-center mb-8'>Welcome Back</h2>
          
          {errors.submit && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg'>
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-gray-700 font-medium mb-2'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-black`}
                placeholder='Enter your email'
                disabled={isLoading}
              />
              {errors.email && (
                <p className='mt-1 text-red-500 text-sm'>{errors.email}</p>
              )}
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-black`}
                placeholder='Enter your password'
                disabled={isLoading}
              />
              {errors.password && (
                <p className='mt-1 text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className={`w-full py-3 bg-black text-white rounded-lg font-medium
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'} 
                transition-colors`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className='text-black font-medium hover:underline'
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
