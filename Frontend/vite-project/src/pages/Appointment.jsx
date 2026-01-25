// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets/assets';

// function Appointment() {
//   const { docId } = useParams();
//   const { doctors ,currenySymbol} = useContext(AppContext);
//   const [docInfo, setDocInfo] = useState(null);
//   const[docSlot,setDocSlot] = useState([]);
//   const[slotIndex,setDocSlotIndex] = useState(0);
//   const[slottime , setSlotTime] = useState("");


//   const fetchDocInfo = () => {
//     const doctor = doctors.find(doc => doc._id === docId); 
   
    
//     setDocInfo(doctor);
//   };

//   const getAvailableSlot = async()=>{
//     setDocSlot([])
//     //getting current date 
//     let today =  new Date();
//     for(let i = 0 ; i<7 ;i++){
//       currenDate.setDate(today.getDate()+i);
//     // time 
//     let endtime = new Date();
//     endTime.setDate(today.getDate()+i);
//     endTime.setHours(21,0,0,0);
//     //hours
//     if(today.getDate() === currenDate.getDate()){
//       currenDate.setHours(currenDate.getHours() > 10 ? currenDate.getHours()+1 : 10);
//       currenDate.setMinutes(currenDate.getMinutes()>30 ?  30 : 0);
//     }else{
//       currenDate.setHours(10);
//       currenDate.setMinutes(0);

//     }

//     let timeSlots =[];
//     while(currenDate < endTime ){
//       let formattedTime = currenDate.toLocalTimeString([],{hours: '2-digit ',minute:'2-digits'})
//       // add slot to array 
//       timeSlots.push({
//         datetime:new Date(currenDate),
//         time:formattedTime
//       })
//       // increase time +30
//       currenDate.setMinutes(currenDate.getMinutes()+30);

//     }
//     setDocSlot(prev =>([...prev,timeSlots]))

//     }
//   }

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(()=>{
//     getAvailableSlot();
//   },[docInfo])

//   useEffect(()=>{
//     console.log(docSlot);
    
//   },[docSlot])

//   return docInfo ? (
//     <div>
//       <div className='flex flex-col sm:flex-row gap-4 '>
//         <div>
//         <img  className='bg-primary w-full sm:max-w-72 rounded lg' src={docInfo.image}  />
//       </div>

//       <div className=' flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px]  sm:mt-0'>
//         <p className=' flex items-center gap-2 text-2xl font-medium text-gray-900'> {docInfo.name}
//           <img  className="w-5" src={assets.verified_icon} />
//         </p>
//         <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//           <p>{docInfo.degree} - {docInfo.speciality}</p>
//           <button className='py-0.5 px-2 border text-xs rounded-full  '>{docInfo.experince}</button>
//         </div>
//         <div>
//           <p  className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 '>About <img src={assets.info_icon} /></p>
//           <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>{docInfo.about}</p>
//         </div>
//         <p className='text-gray-500 font-medium mt-4 '>
//           Appointment fee: <span className='text-gray-600'>{currenySymbol}{docInfo.fees}</span></p>

//           <div>
//      <button type="button" 
//         aria-label="Book appointment" 
//         class="
//             relative 
//             inline-flex items-center justify-center 
//             py-1 px-4 sm:py-2 sm:px-5 
//             text-base sm:text-lg 
//             font-medium 
//             bg-white
//             text-teal-600
//             border border-transparent
//             rounded-full 
//             shadow-lg 
//             overflow-hidden
//             mt-4
            
//             transition-all duration-200 ease-in-out
            
//             hover:bg-teal-500
//             hover:text-white
//             hover:shadow-xl
//             hover:-translate-y-0.5

//             focus:outline-none 
//             focus:ring-2 
//             focus:ring-teal-500 
//             focus:ring-offset-2 
//             focus:ring-offset-white
            
//             active:bg-teal-700 
//             active:scale-[0.98]
            
//             disabled:opacity-50 
//             disabled:cursor-not-allowed
//             ">
//     {/* <!-- SVG Icon --> */}
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-3">
//         <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .21-.084.41-.234.558l-3.25 3.25a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 00.234-.558V6z" clip-rule="evenodd" />
//     </svg>

//     Book Appointment
// </button>
        
//           </div>
//       </div>
//     </div>
//     </div>
//   ) : (
//     <p>Loading doctor information...</p>
//   );
// }

// export default Appointment;




// ************************NEW***********************************
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets/assets';
import { useNavigate } from "react-router-dom";


// Helper function (assuming you place it right here or import it)

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function Appointment() {
    const { docId } = useParams();
    // const { id } = useParams();
     const navigate = useNavigate();

    const { doctors, currenySymbol } = useContext(AppContext);
    
    // ---------------------- STATE MANAGEMENT ----------------------
    const [docInfo, setDocInfo] = useState(null);
    const [docSlot, setDocSlot] = useState([]); // Stores the generated, available slots
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls the final booking form modal
    const [formData, setFormData] = useState({
        patientName: '',
        patientPhone: '',
        date: '', // Holds selected YYYY-MM-DD string
        time: '', // Holds selected HH:MM AM/PM string
    });
    // --------------------------------------------------------------

    // --- Handlers for Form and Modal ---
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSlotSelection = (dateString, timeString) => {
        setFormData(prev => ({
            ...prev,
            date: dateString,
            time: timeString,
        }));
    };

    const handleBookAppointment = () => {
        // Only open the modal if a date and time have been selected
        if (formData.date && formData.time) {
            setIsModalOpen(true);
        } else {
            alert("Please select an appointment date and time slot first.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    
    // --- API Submission Handler ---
const handleSubmitAppointment = async (e) => {
  e.preventDefault();

  try {
    // ✅ Step 1: Get JWT token from localStorage
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("⚠️ Please log in to book an appointment!");
      return;
    }

    // ✅ Step 2: Prepare booking data
//   const bookingData = {
//   doctorId: docId,                  // match backend field
//   patientName: formData.patientName,
//   patientPhone: formData.patientPhone,
//   appointmentDate: formData.date,   // match backend schema
//   appointmentTime: formData.time,   // match backend schema
//   status: "Pending"
// };
const bookingData = {
  doctorId: docId,
  patientName: formData.patientName,
  patientPhone: formData.patientPhone,
  appointmentDate: formData.date,
  appointmentTime: formData.time,
  status: "Pending",
};




    console.log("📤 Booking data being sent:", bookingData);

    // ✅ Step 3: Make API request
    // const response = await fetch("http://localhost:8989/api/user/bookAppointment", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`, // ✅ Use token properly
    //   },
    //   credentials: "include", // optional (also sends cookie)
    //   body: JSON.stringify(bookingData),
    // });
const response = await fetch("http://localhost:8989/api/user/bookAppointment", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
  body: JSON.stringify(bookingData),
});


    // ✅ Step 4: Parse response
   

    const data = await response.json();
    console.log("📥 API Response:", data);

    if (response.ok && data.success) {
      alert("✅ Appointment booked successfully!");
         navigate("/my-appointments"); 
    } else {
      alert(`❌ ${data.message || "Failed to book appointment."}`);
    }
  } catch (error) {
    console.error("Submission Error:", error);
    alert("⚠️ Something went wrong while booking appointment!");
  }
};


    // --- Data Fetching and Slot Generation ---
    const fetchDocInfo = () => {
        const doctor = doctors.find(doc => doc._id === docId); 
        setDocInfo(doctor);
    };

    const getAvailableSlot = async () => {
        // This function simulates checking availability over the next 7 days (10:00 to 21:00)
        setDocSlot([]);
        const slotsByDay = [];
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            // Create a new Date object for the current day
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            currentDate.setHours(0, 0, 0, 0); // Set to midnight for a clean date

            let startTime = new Date(currentDate);
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0); // End at 9:00 PM (21:00)

            // Adjust the start time for today's date
            if (i === 0) {
                const now = new Date();
                startTime = new Date(now);
                // Round up to the next 30-minute mark + 30 minutes buffer
                startTime.setMinutes(now.getMinutes() > 30 ? 60 : 30); 
                
                // If the start time is before the official 10 AM start, reset to 10 AM
                if (startTime.getHours() < 10) {
                     startTime.setHours(10, 0, 0, 0);
                }
                
                if (startTime >= endTime) {
                    continue; // Skip if no slots left today
                }
            } else {
                // For future days, start at 10 AM
                startTime.setHours(10, 0, 0, 0);
            }

            let timeSlots = [];
            let cursorTime = startTime;

            while (cursorTime < endTime) {
                let formattedTime = cursorTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                
                timeSlots.push({
                    datetime: new Date(cursorTime),
                    time: formattedTime,
                    dateKey: formatDate(currentDate) // e.g., "2024-10-27"
                });
                
                // Increment time by 30 minutes
                cursorTime.setMinutes(cursorTime.getMinutes() + 30);
            }
            
            if (timeSlots.length > 0) {
                slotsByDay.push({
                    date: currentDate,
                    slots: timeSlots
                });
            }
        }
        setDocSlot(slotsByDay);
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    // Re-run slot generation when doctor info is fetched
    useEffect(() => {
        if (docInfo) {
            getAvailableSlot();
        }
    }, [docInfo]);
    
    // --- JSX RENDER ---
    return docInfo ? (
        <div className='p-4'>
            <div className='flex flex-col sm:flex-row gap-4 '>
                
                {/* DOCTOR IMAGE SECTION */}
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
                </div>

                {/* DOCTOR INFO SECTION */}
                <div className=' flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
  Dr. {docInfo.firstName} {docInfo.lastName}
  <img className="w-5" src={assets.verified_icon} alt="Verified" />
</p>

                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experince}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 '>About <img src={assets.info_icon} alt="Info" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4 '>
                        Appointment fee: <span className='text-gray-600'>{currenySymbol}{docInfo.fees}</span>
                    </p>
                    
                    {/* --- SLOT SELECTION SECTION --- */}
                    <h3 className='text-xl font-bold mt-6 mb-3 text-gray-800'>Select Date & Time</h3>
                    
                    {docSlot.length === 0 ? (
                        <p className='text-red-500'>No slots available for the next 7 days.</p>
                    ) : (
                        docSlot.map((dayData, dayIndex) => (
                            <div key={dayIndex} className='mb-6 p-4 border rounded-lg bg-gray-50'>
                                <p className='font-bold text-lg text-teal-700 mb-2'>
                                    {dayData.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <div className='flex flex-wrap gap-2'>
                                    {dayData.slots.map((slot, slotIndex) => {
                                        const isSelected = formData.date === slot.dateKey && formData.time === slot.time;
                                        return (
                                            <button
                                                key={slotIndex}
                                                onClick={() => handleSlotSelection(slot.dateKey, slot.time)}
                                                className={`
                                                    px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150
                                                    ${isSelected 
                                                        ? 'bg-teal-600 text-white shadow-md' 
                                                        : 'bg-white text-teal-600 border border-teal-300 hover:bg-teal-50'
                                                    }
                                                `}
                                                // Assuming you will add backend logic later to disable booked slots
                                            >
                                                {slot.time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* BOOK APPOINTMENT BUTTON */}
                    <div>
                        <button 
                            type="button" 
                            aria-label="Book appointment" 
                            onClick={handleBookAppointment}
                            disabled={!formData.date || !formData.time} // Disabled until a slot is selected
                            className="
                                relative inline-flex items-center justify-center py-2 px-5 text-lg font-medium 
                                bg-white text-teal-600 border border-teal-600 rounded-full shadow-lg overflow-hidden mt-4 
                                transition-all duration-200 ease-in-out hover:bg-teal-600 hover:text-white hover:shadow-xl 
                                hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 
                                focus:ring-offset-2 focus:ring-offset-white active:bg-teal-700 active:scale-[0.98] 
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-teal-600
                            "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .21-.084.41-.234.558l-3.25 3.25a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 00.234-.558V6z" clipRule="evenodd" />
                            </svg>
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MODAL FOR FINAL PATIENT DETAILS --- */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-2xl w-full max-w-md'>
                        <h2 className='text-xl font-bold mb-2'>Confirm Booking</h2>
                        <p className='mb-4 text-gray-600'>For **{formData.time}** on **{new Date(formData.date).toLocaleDateString()}**</p>
                        
                        <form onSubmit={handleSubmitAppointment}> 
                            
                            {/* Patient Name */}
                            <div className='mb-3'>
                                <label className='block text-gray-700 text-sm font-bold mb-1'>Your Name</label>
                                <input 
                                    type="text"
                                    name="patientName"
                                    value={formData.patientName}
                                    onChange={handleFormChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                    required
                                />
                            </div>

                            {/* Patient Phone */}
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-1'>Phone Number</label>
                                <input 
                                    type="tel"
                                    name="patientPhone"
                                    value={formData.patientPhone}
                                    onChange={handleFormChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                    required
                                />
                            </div>
                            
                            <div className='flex justify-end gap-3'>
                                <button 
                                    type="button" 
                                    onClick={closeModal} 
                                    className='bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400'
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className='bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700'
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <p>Loading doctor information...</p>
    );
}

export default Appointment;