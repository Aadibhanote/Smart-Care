// import React, { useContext, useState, useEffect } from 'react';
// // import { DoctorContext } from '../../context/DoctorContext';
// import axios from 'axios';

// const DoctorList = () => {
 

//   const [doctor, setDoctor] = useState([]);

  

//   // const changeAvailabilty = async (docId) =>{
//   //   try {
//   //     const response = await axios.post(`${import.meta.env.VITE_URL}/admin/changeAvailability/${docId}`,{

//   //     },{withCredentials:true})
//   //     console.log(response);
      
      
//   //   } catch (error) {
//   //     console.log(error);
      
//   //   }
//   // }

//   const getData = async () => {
//     try {
//        const token = localStorage.getItem("aToken");
//       const response = await axios.get(import.meta.env.VITE_URL+"/api/admin/allDoctors",{
//         withCredentials:true
//       });
//      console.log(response?.data?.doctor)
//      setDoctor(response?.data?.doctor);

        
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);
  

// // const doctors =["he"];

//   return (
//     <div className="p-6 mt-6  rounded-lg ">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor List</h2>

//     {doctor.length === 0 ? (
//       <p className="text-lg text-gray-500">No doctors added yet.</p>
//     ) : (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {doctor.map((ele) => (
//           <div
//             key={ele._id}
//             className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200"
//           >
//             <img src={ele?.image} className='h-52 w-52 rounded-lg' />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               Dr. {ele?.firstName} {ele?.lastName}
//             </h3>
//           <p>{ele?.speciality}</p>
//         <div className='flex gap-2 mt-2'>
//         <input  type="checkbox" /><span>Availabe</span>
//         </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
   
//   );
// };

// export default DoctorList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("aToken");
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/admin/allDoctors`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      // backend returns doctor array in response.data.doctor or response.data.doctors
      const fetched = response.data.doctor || response.data.doctors || [];
      setDoctors(fetched);
    } catch (error) {
      console.error("Error fetching doctors:", error.response?.data || error.message);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Toggle availability
  const changeAvailability = async (docId) => {
    try {
      const token = localStorage.getItem("aToken");
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/admin/changeAvailability/${docId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // optimistic UI: update local state immediately (use response.available if returned)
      const newAvailable = response.data.available ?? null;
      setDoctors((prev) =>
        prev.map((d) =>
          d._id === docId ? { ...d, available: newAvailable ?? !d.available } : d
        )
      );

      toast.success(response.data.message || "Availability updated");
      // optionally re-fetch full list to be sure
      // await getData();
    } catch (error) {
      console.error("Error changing availability:", error.response?.data || error.message);
      toast.error("Failed to update availability");
    }
  };

  return (
    <div className="p-6 mt-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor List</h2>

      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-lg text-gray-500">No doctors added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((ele) => (
            <div
              key={ele._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200"
            >
              <img
                src={ele?.image}
                className="h-52 w-full object-cover rounded-lg mb-3"
                alt={`Dr. ${ele?.firstName}`}
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-1">
                Dr. {ele?.firstName} {ele?.lastName}
              </h3>
              <p className="text-gray-600 mb-2">{ele?.speciality}</p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <input
                    id={`avail-${ele._id}`}
                    type="checkbox"
                    checked={!!ele?.available}
                    onChange={() => changeAvailability(ele._id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor={`avail-${ele._id}`} className="text-sm">
                    {ele?.available ? "Available" : "Unavailable"}
                  </label>
                </div>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    ele?.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {ele?.available ? "Visible to users" : "Hidden from users"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
