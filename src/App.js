import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import LoginPage from './Component/LoginPage';
import AboutUs from './Component/AboutUs';
import ProtectedRoute from './Component/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            } 
          />
          {/* Add other protected routes similarly */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
