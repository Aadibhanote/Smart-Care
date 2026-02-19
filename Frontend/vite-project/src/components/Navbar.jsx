// import React, { useState } from 'react'
// import {assets} from '../assets/assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'


// function Navbar() {
//     const navigate = useNavigate();
//     const[showMenu , setShowMenu] = useState(false);
//     const[token , setToken] = useState(true);

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400'>
//          <img onClick={()=>navigate("/")} className=' width-44 cursor-pointer'src={assets.logo} alt='' />
//          <ul className=' hidden md:flex items-start gap-10 font-medium'>

//             <NavLink to='/'>
//         <li className='py-4'>HOME</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//             </NavLink>

//             <NavLink to='/doctors'>
//         <li className='py-4'>ALL DOCTORS</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//             </NavLink>

//             <NavLink to='/about'>
//         <li className='py-4'>ABOUT</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//             </NavLink>

//             <NavLink to='/contact'>
//         <li className='py-4'>CONTACT</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//             </NavLink>
//          </ul>
//          <div className='flex items-center gap-4'>
//             {
//                 token
//                 ?<div className='flex items-center gap-2 cursor-pointer group relative'>
//                  <img className='w-8 rounded-full' src={assets.profile_pic} />
//                  <img className=' w-2.5' src={assets.dropdown_icon} alt="" />
//                  <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
//                     <div className=' min-w-48 bg-stone-50 rounded flex flex-col gap-4 p-4'>
//                         <p onClick={()=> navigate("/my-profile")} className='hover: text-black cursor-pointer'>My Profile</p>
//                         <p onClick={()=> navigate("/my-appointments")} className='hover: text-black cursor-pointer'>My Appointments</p>
//                         <p onClick={()=>setToken(false)} className='hover: text-black cursor-pointer' >Logout</p>
//                     </div>
//                  </div>
//                 </div>
//                 : <button onClick={()=>{navigate('/login')}} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
//             }
           
//          </div>
//     </div>
//   )
// }

// export default Navbar

// ///////////////////NEW//////////////
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false);

  // ✅ Check login status on page load (localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setToken(true);
    }
  }, []);

  // ✅ Handle logout (backend + frontend)
  const handleLogout = async () => {
    try {
      // 1️⃣ Call backend to clear cookie
      // ${import.meta.env.VITE_BACKEND_URL}/api/admin/donations
      await fetch("http://localhost:8989/api/admin/donations", {
        method: "POST",
        credentials: "include",
      });

      // 2️⃣ Clear frontend data
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      setToken(false);

      alert("Logout successful!");
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400">
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <ul className="hidden md:flex items-start gap-10 font-medium">
        <NavLink to="/"><li className="py-4">HOME</li></NavLink>
        <NavLink to="/doctors"><li className="py-4">ALL DOCTORS</li></NavLink>
        <NavLink to="/about"><li className="py-4">ABOUT</li></NavLink>
        <NavLink to="/contact"><li className="py-4">CONTACT</li></NavLink>
       {token && (
        <>
  <NavLink to="/donate">
    <li className="py-4">DONATE</li>
  </NavLink>
  <NavLink to="/donations">
        <li className="py-4">DONATIONS AVAILABLE</li>
      </NavLink>
        </>
  
)}

      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-50 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointments</p>
               <p  onClick={() => navigate("/my-donations")}
  className="hover:text-black cursor-pointer"
>
  My Donation
</p>


<p
  onClick={() => navigate("/donations")}
  className="hover:text-black cursor-pointer"
>
  View Donations
</p>

                <p onClick={handleLogout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
