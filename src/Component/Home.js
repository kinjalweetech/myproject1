import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { getCompanies, requestDemo, getStarted } from './Service/HomeService'

function Home() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Auto slide effect
  useEffect(() => {
    if (companies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(companies.length / 4));
      }, 3000); // Change slides every 3 seconds

      return () => clearInterval(timer);
    }
  }, [companies]);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      setError('Failed to load companies');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get current companies to display
  const getCurrentCompanies = () => {
    const companiesPerSlide = 4;
    const start = currentSlide * companiesPerSlide;
    return companies.slice(start, start + companiesPerSlide);
  };

  const handleGetStarted = async () => {
    try {
      await getStarted();
      navigate('/signup');
    } catch (err) {
      console.error('Error in get started:', err);
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestDemo(demoForm);
      setShowDemoModal(false);
      setDemoForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('Error requesting demo:', err);
    }
  };

  return (
    <div>
      <Header/>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-purple-50'>
        <h1 className='text-7xl font-bold text-center mb-12 max-w-4xl'>
          Skills speak louder than words
        </h1>
        
        <p className='text-xl text-gray-600 text-center max-w-3xl'>
          We help companies develop the strongest tech teams around. We help candidates sharpen their tech skills and pursue job opportunities.
        </p>

        <div className='flex gap-4 mt-12'>
          <button 
            onClick={handleGetStarted}
            className='px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
          >
            Get started for free
          </button>
          <button 
            onClick={() => setShowDemoModal(true)}
            className='px-8 py-3 border border-black rounded-lg hover:bg-gray-100 transition-colors'
          >
            Request Demo
          </button>
        </div>

        {/* Companies Section */}
        <div className='mt-20 w-full'>
          <p className='text-center text-gray-600 mb-12 text-lg'>
            Over 40% of developers worldwide and 3,000 companies use HackerRank
          </p>
          
          {/* {loading ? (
            <div className='text-center'>Loading...</div>
          ) : error ? (
            <div className='text-center text-red-500'>{error}</div>
          ) : (
            <div className='relative overflow-hidden w-full'>
              <div 
                className='flex justify-center items-center gap-x-16 transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {getCurrentCompanies().map((company) => (
                  <div 
                    key={company.id} 
                    className='flex-shrink-0 w-[200px] flex items-center justify-center'
                  >
                    <img 
                      src={company.logo}
                      alt={company.name}
                      className='h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300'
                    />
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              {/* <div className='flex justify-center mt-8 gap-2'>
                {Array.from({ length: Math.ceil(companies.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-black w-4' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div> */}
            {/* </div> */}
          {/* )}  */}
        </div>
      </div>

      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-xl p-8 max-w-md w-full'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold'>Request a Demo</h2>
              <button 
                onClick={() => setShowDemoModal(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleDemoSubmit} className='space-y-4'>
              <div>
                <label className='block text-gray-700 mb-2'>Name</label>
                <input
                  type='text'
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black'
                  required
                />
              </div>
              
              <div>
                <label className='block text-gray-700 mb-2'>Email</label>
                <input
                  type='email'
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black'
                  required
                />
              </div>
              
              <div>
                <label className='block text-gray-700 mb-2'>Company</label>
                <input
                  type='text'
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black'
                  required
                />
              </div>
              
              <div>
                <label className='block text-gray-700 mb-2'>Message</label>
                <textarea
                  value={demoForm.message}
                  onChange={(e) => setDemoForm({...demoForm, message: e.target.value})}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black'
                  rows={4}
                />
              </div>

              <button
                type='submit'
                className='w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
