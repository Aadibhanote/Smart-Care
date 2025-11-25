// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets/assets'

// const Myprofile = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Sample user data - in real app, this would come from context/API
//   const [userData, setUserData] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     mobile: '9876543210',
//     age: '28',
//     gender: 'male',
//     bloodGroup: 'O+',
//     organDonor: true,
//     profilePicture: assets.profile_pic
//   });

//   const [editData, setEditData] = useState(userData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setEditData(prev => ({
//       ...prev,
//       [name]: checked
//     }));
//   };

//   const handleSave = () => {
//     setUserData(editData);
//     setIsEditing(false);
//     // Here you would typically make an API call to save the data
//     console.log('Profile updated:', editData);
//   };

//   const handleCancel = () => {
//     setEditData(userData);
//     setIsEditing(false);
//   };

//   return (
//     <div className='py-8'>
//       {/* Profile Header */}
//       <div className='bg-primary rounded-lg px-6 md:px-10 py-8 md:py-12 mb-8'>
//         <div className='flex flex-col md:flex-row items-center gap-6'>
//           <div className='relative'>
//             <img 
//               src={userData.profilePicture} 
//               alt="Profile" 
//               className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover'
//             />
//             {isEditing && (
//               <label className='absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-lg'>
//                 <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
//                 </svg>
//                 <input 
//                   type='file' 
//                   className='hidden' 
//                   accept='image/*'
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onloadend = () => {
//                         setEditData(prev => ({ ...prev, profilePicture: reader.result }));
//                       };
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                 />
//               </label>
//             )}
//           </div>
//           <div className='flex-1 text-center md:text-left'>
//             <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
//               {isEditing ? (
//                 <input
//                   type='text'
//                   name='name'
//                   value={editData.name}
//                   onChange={handleInputChange}
//                   className='bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 w-full md:w-auto'
//                 />
//               ) : (
//                 userData.name
//               )}
//             </h1>
//             <p className='text-white/90 text-lg mb-4'>{userData.email}</p>
//             <div className='flex flex-wrap gap-2 justify-center md:justify-start'>
//               {userData.organDonor && (
//                 <span className='bg-red-500/80 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2'>
//                   <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
//                     <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
//                   </svg>
//                   Organ Donor
//                 </span>
//               )}
//               <span className='bg-white/20 text-white px-4 py-1 rounded-full text-sm'>
//                 Member since 2024
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className='flex flex-col sm:flex-row gap-4 mb-8'>
//         {!isEditing ? (
//           <>
//             <button
//               onClick={() => setIsEditing(true)}
//               className='bg-primary text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center gap-2'
//             >
//               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
//               </svg>
//               Edit Profile
//             </button>
//             <button
//               onClick={() => navigate('/my-appointment')}
//               className='bg-blue-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center gap-2'
//             >
//               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
//               </svg>
//               My Appointments
//             </button>
//             <button
//               onClick={() => navigate('/doctors')}
//               className='bg-green-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center gap-2'
//             >
//               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
//               </svg>
//               Book Appointment
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={handleSave}
//               className='bg-green-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center gap-2'
//             >
//               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
//               </svg>
//               Save Changes
//             </button>
//             <button
//               onClick={handleCancel}
//               className='bg-gray-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center gap-2'
//             >
//               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
//               </svg>
//               Cancel
//             </button>
//           </>
//         )}
//       </div>

//       {/* Profile Information */}
//       <div className='grid md:grid-cols-2 gap-6 mb-8'>
//         {/* Personal Information */}
//         <div className='bg-white border border-gray-200 rounded-xl p-6'>
//           <h2 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
//             <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
//             </svg>
//             Personal Information
//           </h2>
          
//           <div className='space-y-4'>
//             <div>
//               <label className='text-sm font-medium text-gray-600 block mb-1'>Full Name</label>
//               {isEditing ? (
//                 <input
//                   type='text'
//                   name='name'
//                   value={editData.name}
//                   onChange={handleInputChange}
//                   className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
//                 />
//               ) : (
//                 <p className='text-gray-900'>{userData.name}</p>
//               )}
//             </div>

//             <div>
//               <label className='text-sm font-medium text-gray-600 block mb-1'>Email</label>
//               {isEditing ? (
//                 <input
//                   type='email'
//                   name='email'
//                   value={editData.email}
//                   onChange={handleInputChange}
//                   className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
//                 />
//               ) : (
//                 <p className='text-gray-900'>{userData.email}</p>
//               )}
//             </div>

//             <div>
//               <label className='text-sm font-medium text-gray-600 block mb-1'>Mobile Number</label>
//               {isEditing ? (
//                 <input
//                   type='tel'
//                   name='mobile'
//                   value={editData.mobile}
//                   onChange={handleInputChange}
//                   maxLength='10'
//                   className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
//                 />
//               ) : (
//                 <p className='text-gray-900'>{userData.mobile}</p>
//               )}
//             </div>

//             <div className='grid grid-cols-2 gap-4'>
//               <div>
//                 <label className='text-sm font-medium text-gray-600 block mb-1'>Age</label>
//                 {isEditing ? (
//                   <input
//                     type='number'
//                     name='age'
//                     value={editData.age}
//                     onChange={handleInputChange}
//                     min='1'
//                     max='120'
//                     className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
//                   />
//                 ) : (
//                   <p className='text-gray-900'>{userData.age} years</p>
//                 )}
//               </div>

//               <div>
//                 <label className='text-sm font-medium text-gray-600 block mb-1'>Gender</label>
//                 {isEditing ? (
//                   <select
//                     name='gender'
//                     value={editData.gender}
//                     onChange={handleInputChange}
//                     className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
//                   >
//                     <option value='male'>Male</option>
//                     <option value='female'>Female</option>
//                     <option value='other'>Other</option>
//                   </select>
//                 ) : (
//                   <p className='text-gray-900 capitalize'>{userData.gender}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Medical Information */}
//         <div className='bg-white border border-gray-200 rounded-xl p-6'>
//           <h2 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
//             <svg className='w-6 h-6 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
//             </svg>
//             Medical Information
//           </h2>
          
//           <div className='space-y-4'>
//             <div>
//               <label className='text-sm font-medium text-gray-600 block mb-1'>Blood Group</label>
//               {isEditing ? (
//                 <select
//                   name='bloodGroup'
//                   value={editData.bloodGroup}
//                   onChange={handleInputChange}
//                   className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
//                 >
//                   <option value='A+'>A+</option>
//                   <option value='A-'>A-</option>
//                   <option value='B+'>B+</option>
//                   <option value='B-'>B-</option>
//                   <option value='AB+'>AB+</option>
//                   <option value='AB-'>AB-</option>
//                   <option value='O+'>O+</option>
//                   <option value='O-'>O-</option>
//                 </select>
//               ) : (
//                 <p className='text-gray-900 text-lg font-semibold'>{userData.bloodGroup}</p>
//               )}
//             </div>

//             <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
//               <label className='flex items-center gap-3 cursor-pointer'>
//                 <input
//                   type='checkbox'
//                   name='organDonor'
//                   checked={editData.organDonor}
//                   onChange={handleCheckboxChange}
//                   disabled={!isEditing}
//                   className='w-5 h-5 text-red-600 rounded focus:ring-red-500'
//                 />
//                 <div>
//                   <p className='font-semibold text-gray-900'>Organ Donor</p>
//                   <p className='text-sm text-gray-600'>
//                     {editData.organDonor 
//                       ? 'You are registered as an organ donor. Thank you for your generosity!'
//                       : 'Register as an organ donor and help save lives.'}
//                   </p>
//                 </div>
//               </label>
//             </div>

//             <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
//               <div className='flex items-start gap-3'>
//                 <svg className='w-6 h-6 text-blue-600 mt-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
//                 </svg>
//                 <div>
//                   <p className='font-semibold text-gray-900 mb-1'>Medical Records</p>
//                   <p className='text-sm text-gray-600 mb-2'>
//                     Your medical information is kept secure and confidential. This information helps us connect you with compatible organ matches if needed.
//                   </p>
//                   <button className='text-sm text-blue-600 font-medium hover:underline'>
//                     View Medical History
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
//         <div className='bg-white border border-gray-200 rounded-xl p-6 text-center'>
//           <div className='text-3xl font-bold text-primary mb-2'>12</div>
//           <div className='text-sm text-gray-600'>Total Appointments</div>
//         </div>
//         <div className='bg-white border border-gray-200 rounded-xl p-6 text-center'>
//           <div className='text-3xl font-bold text-green-500 mb-2'>8</div>
//           <div className='text-sm text-gray-600'>Completed</div>
//         </div>
//         <div className='bg-white border border-gray-200 rounded-xl p-6 text-center'>
//           <div className='text-3xl font-bold text-blue-500 mb-2'>3</div>
//           <div className='text-sm text-gray-600'>Upcoming</div>
//         </div>
//         <div className='bg-white border border-gray-200 rounded-xl p-6 text-center'>
//           <div className='text-3xl font-bold text-red-500 mb-2'>1</div>
//           <div className='text-sm text-gray-600'>Cancelled</div>
//         </div>
//       </div>

//       {/* Account Settings */}
//       <div className='bg-white border border-gray-200 rounded-xl p-6'>
//         <h2 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
//           <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
//             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
//           </svg>
//           Account Settings
//         </h2>
        
//         <div className='space-y-4'>
//           <button className='w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between'>
//             <div className='flex items-center gap-3'>
//               <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
//               </svg>
//               <span className='text-gray-900 font-medium'>Change Password</span>
//             </div>
//             <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
//             </svg>
//           </button>

//           <button className='w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between'>
//             <div className='flex items-center gap-3'>
//               <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
//               </svg>
//               <span className='text-gray-900 font-medium'>Privacy Settings</span>
//             </div>
//             <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
//             </svg>
//           </button>

//           <button className='w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between'>
//             <div className='flex items-center gap-3'>
//               <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
//               </svg>
//               <span className='text-gray-900 font-medium'>Download Medical Records</span>
//             </div>
//             <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Myprofile
import React, { useState, useEffect } from 'react';
import './Myprofile.css';

const Myprofile = () => {

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    image: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  // ---------------- FETCH PROFILE ----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const result = await res.json();

        if (result.success) {
          setUserData(result.user);
          setEditedData(result.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  // ---------------- HANDLE INPUT CHANGE ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ---------------- HANDLE IMAGE UPLOAD ----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData(prev => ({
          ...prev,
          image: reader.result // <-- Backend field is "image"
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(editedData)
      });

      const result = await res.json();

      if (result.success) {
        setUserData(result.user);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(result.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>

        <div className="profile-content">

          {/* IMAGE */}
          <div className="profile-image-section">
            <div className="image-wrapper">
              <img
                src={isEditing ? editedData.image : userData.image}
                alt="Profile"
                className="profile-image"
              />

              {isEditing && (
                <label className="image-upload-label">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
                  <span className="upload-icon">📷</span>
                </label>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="profile-info">
            {isEditing ? (
              <>
                {/* First Name */}
                <div className="info-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>

                {/* Last Name */}
                <div className="info-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>

                {/* Email */}
                <div className="info-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>

                {/* Phone */}
                <div className="info-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                </div>

                {/* Gender */}
                <div className="info-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={editedData.gender}
                    onChange={handleInputChange}
                    className="info-input"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                {/* Save + Cancel */}
                <div className="action-buttons">
                  <button onClick={handleSave} className="save-button">Save Changes</button>
                  <button onClick={handleCancel} className="cancel-button">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="info-item">
                  <div className="info-label">👤 Full Name</div>
                  <div className="info-value">{userData.firstName} {userData.lastName}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">📧 Email Address</div>
                  <div className="info-value">{userData.email}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">📱 Phone Number</div>
                  <div className="info-value">{userData.phone}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">⚧️ Gender</div>
                  <div className="info-value">{userData.gender}</div>
                </div>

                <button onClick={() => setIsEditing(true)} className="edit-button">
                  Edit Profile
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Myprofile;

