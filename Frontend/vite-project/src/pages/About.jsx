import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets/assets'

const About = () => {
  const navigate = useNavigate();

  return (
    <div className='py-8'>
      {/* Hero Section */}
      <div className='bg-primary rounded-lg px-6 md:px-10 lg:px-20 py-12 md:py-16 mb-12'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight'>
            About SmartCare
          </h1>
          <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
            Your trusted healthcare companion connecting patients with doctors and facilitating life-saving organ donations
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='mb-16'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Mission</h2>
          <p className='text-gray-600 max-w-3xl mx-auto text-lg'>
            To revolutionize healthcare accessibility by making doctor appointments seamless and creating a platform 
            that connects organ donors with those in need, saving lives one connection at a time.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className='mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12'>What We Offer</h2>
        
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          {/* Doctor Appointment Feature */}
          <div className='bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='bg-blue-100 p-4 rounded-full'>
                <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <h3 className='text-2xl font-semibold text-gray-900'>Doctor Appointments</h3>
            </div>
            <p className='text-gray-600 leading-relaxed mb-4'>
              Book appointments with trusted, verified doctors across various specialties. Browse through our extensive 
              network of healthcare professionals, view their profiles, experience, and availability, then schedule 
              your appointment hassle-free.
            </p>
            <ul className='text-gray-600 space-y-2 mb-6'>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Browse doctors by specialty</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>View doctor profiles and credentials</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Easy appointment scheduling</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Manage your appointments</span>
              </li>
            </ul>
            <button 
              onClick={() => navigate('/doctors')}
              className='bg-primary text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 text-sm font-medium'
            >
              Book Appointment
            </button>
          </div>

          {/* Organ Donation Feature */}
          <div className='bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='bg-red-100 p-4 rounded-full'>
                <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <h3 className='text-2xl font-semibold text-gray-900'>Organ Donation</h3>
            </div>
            <p className='text-gray-600 leading-relaxed mb-4'>
              Connect organ donors with patients in need. Our platform facilitates life-saving organ donations by 
              creating a secure, transparent network where donors can register and patients can find compatible matches, 
              bringing hope to those waiting for a second chance at life.
            </p>
            <ul className='text-gray-600 space-y-2 mb-6'>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Register as an organ donor</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Find compatible organ matches</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Secure and confidential platform</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Save lives through donation</span>
              </li>
            </ul>
            <button 
              onClick={() => navigate('/contact')}
              className='bg-red-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 text-sm font-medium'
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='bg-gray-50 rounded-xl p-8 md:p-12 mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12'>Our Core Values</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Trust & Safety</h3>
            <p className='text-gray-600'>
              We ensure all doctors are verified and all organ donation processes are secure and transparent.
            </p>
          </div>
          
          <div className='text-center'>
            <div className='bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Accessibility</h3>
            <p className='text-gray-600'>
              Making healthcare accessible to everyone with easy-to-use tools and a user-friendly interface.
            </p>
          </div>
          
          <div className='text-center'>
            <div className='bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Community</h3>
            <p className='text-gray-600'>
              Building a compassionate community where people help each other through healthcare and organ donation.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 md:p-12 text-center text-white'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Join SmartCare Today</h2>
        <p className='text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto'>
          Start your healthcare journey with us. Book your first appointment or register as an organ donor and make a difference.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button 
            onClick={() => navigate('/doctors')}
            className='bg-white text-primary px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 font-semibold'
          >
            Find a Doctor
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className='bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-semibold'
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default About