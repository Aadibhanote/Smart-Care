import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('blood');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    bloodGroup: '',
    donationType: 'blood',
    organType: '',
    medicalHistory: '',
    address: '',
    emergencyContact: '',
    consent: false
  });

  const donationTypes = [
    { id: 'blood', name: 'Blood', icon: '🩸', color: 'red' },
    { id: 'organ', name: 'Organ', icon: '❤️', color: 'pink' },
    { id: 'tissue', name: 'Tissue', icon: '🦴', color: 'blue' },
    { id: 'bone', name: 'Bone Marrow', icon: '💉', color: 'purple' }
  ];

  const organTypes = [
    'Heart', 'Kidney', 'Liver', 'Lung', 'Pancreas', 
    'Intestine', 'Cornea', 'Skin', 'Bone', 'Tendons'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

const handleTypeSelect = (type) => {
  setSelectedType(type);
  setFormData(prev => ({
    ...prev,
    donationType: type,
    bloodGroup: type === 'blood' ? prev.bloodGroup : '',
    organType: type === 'organ' ? prev.organType : '',
  }));
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      alert('Please provide consent to proceed with donation registration.');
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const donationData = {
        ...formData,
        donationType: selectedType,
        registeredAt: new Date().toISOString()
      };
 
  // "http://localhost:8989/api/user/registerDonation"
      const response = await fetch( `${import.meta.env.VITE_BACKEND_URL}/api/user/registerDonation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('✅ Thank you for your generous donation registration! We will contact you soon.');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          age: '',
          bloodGroup: '',
          donationType: 'blood',
          organType: '',
          medicalHistory: '',
          address: '',
          emergencyContact: '',
          consent: false
        });
        setSelectedType('blood');
         navigate("/donations");
      } else {
        alert(`❌ ${result.message || 'Failed to register donation. Please try again.'}`);
      }
    } catch (error) {
      console.error('Donation registration error:', error);
      alert('⚠️ Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Give the Gift of Life
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
            Your donation can save lives. Register today to become a donor and make a difference.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Donation Type Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What Would You Like to Donate?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {donationTypes.map((type) => (
              <button
               type="button"
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  ${selectedType === type.id
                    ? `bg-teal-600 text-white border-teal-600 shadow-lg`
                    : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
                  }
                `}
              >
                <div className="text-4xl mb-2">{type.icon}</div>
                <div className="font-semibold text-lg">{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <div className="text-3xl mb-3">🩸</div>
            <h3 className="text-xl font-bold mb-2">Blood Donation</h3>
            <p className="text-gray-600">
              One donation can save up to 3 lives. Blood is needed every day for surgeries, emergencies, and treatments.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-500">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="text-xl font-bold mb-2">Organ Donation</h3>
            <p className="text-gray-600">
              Register as an organ donor and give someone a second chance at life. Your organs can save up to 8 lives.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="text-3xl mb-3">🦴</div>
            <h3 className="text-xl font-bold mb-2">Tissue & Body Parts</h3>
            <p className="text-gray-600">
              Donate tissues, bones, corneas, and skin to help restore function and improve quality of life.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Donation Registration Form
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Please fill out the form below to register as a donor
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Your age"
                />
              </div>
            </div>

            {/* Blood Group (for blood donation) */}
            {selectedType === 'blood' && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select your blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Organ Type (for organ donation) */}
            {selectedType === 'organ' && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Organ Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="organType"
                  value={formData.organType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select organ you wish to donate</option>
                  {organTypes.map((organ) => (
                    <option key={organ} value={organ}>{organ}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter your complete address"
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Emergency contact number"
              />
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Medical History (if any)
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Please mention any medical conditions, allergies, or previous surgeries"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-1 mr-3 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-gray-700">
                  I hereby declare that I am willing to donate{' '}
                  <span className="font-semibold">
                    {selectedType === 'blood' ? 'blood' : 
                     selectedType === 'organ' ? 'organs' : 
                     selectedType === 'tissue' ? 'tissues' : 'bone marrow'}
                  </span>{' '}
                  and understand that this registration is voluntary. I confirm that all information provided is accurate to the best of my knowledge. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Register as Donor
              </button>
            </div>
          </form>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-3">📋 Important Information</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• You must be at least 18 years old to register as a donor</li>
            <li>• A medical screening will be conducted before any donation</li>
            <li>• Your information will be kept confidential and secure</li>
            <li>• You can update or withdraw your registration at any time</li>
            <li>• For organ donation, your family's consent will be required at the time of donation</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">📞 Donation Hotline:</span> +91-99999-44444
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📧 Email:</span> donations@smartcare.com
              </p>
            </div>
            <div>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">🕒 Available:</span> 24/7 Emergency Support
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📍 Office Hours:</span> Mon-Sat, 9 AM - 6 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;


