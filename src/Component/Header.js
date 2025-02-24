import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/AuthSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleNavigation = (path) => {
    if (path !== '/home' && !isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='bg-black text-white p-5 flex justify-between items-center'>
      <div className='flex gap-x-6'>
        <h1 className='cursor-pointer hover:text-gray-300' onClick={() => navigate('/home')}>Home</h1>
        <h1 className='cursor-pointer hover:text-gray-300' onClick={() => handleNavigation('/about')}>About Us</h1>
        <h1 className='cursor-pointer hover:text-gray-300' onClick={() => handleNavigation('/service')}>Services</h1>
        <h1 className='cursor-pointer hover:text-gray-300' onClick={() => handleNavigation('/faq')}>FAQ</h1>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <span className="text-gray-300">Welcome, {user.email}</span>
        )}
        <button 
          className='bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors'
          onClick={handleAuthAction}
        >
          {isAuthenticated ? 'Sign Out' : 'Log In'}
        </button>
      </div>
    </div>
  )
}

export default Header
