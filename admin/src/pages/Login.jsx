import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
   const[state ,setState] = useState("Admin")
   const{BASE_URL , setAToken} = useContext(AdminContext);
   const[email , setEmail ] =  useState("");
   const[password  , setPassword ] =  useState("");
console.log("Backend URL:", import.meta.env.VITE_URL);

   const handleSubmit = async(e)=>{
   e.preventDefault();

    try {
      const backendUrl = import.meta.env.VITE_URL || import.meta.env.VITE_BACKEND_URL || "http://localhost:8989";
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password }, {
          withCredentials: true
        });
        
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success(data.message || "Admin Login Successful");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/doctor/login`, { email, password }, {
          withCredentials: true
        });

        if (data.success) {
          localStorage.setItem('dToken', data.token);
          toast.success(data.message || "Doctor Login Successful");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed. Please check credentials.");
    }
   };

  return (
   <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center' >
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
      <p className='text-2xl font-semibold m-auto'><span className='text-blue-500'>{state}</span> Login</p>
  
    <div className='w-full'>
      <p>Email</p>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} className=" border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
    </div>
    <div className='w-full'>
      <p>Password</p>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} className=" border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
    </div>
    <button className='bg-blue-500 text-white py-2 w-full text-base rounded-sm'>Login</button>
{
  state == "Admin" ? <p>Doctor Login ? <span  className='underline text-blue-500 cursor-pointer' onClick={()=>setState("Doctor")}>Click here </span></p>
  :  <p>Admin Login ? <span className='underline text-blue-500 cursor-pointer' onClick={()=>setState("Admin")}>Click here </span></p>
}
</div>

   </form>
  )
}

export default Login