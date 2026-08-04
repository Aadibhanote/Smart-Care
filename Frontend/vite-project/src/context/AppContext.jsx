// import { createContext } from "react";
// import { doctors } from "../assets/assets/assets";

// export const AppContext =createContext();

// const AppContextProvider =(props)=>{ //what we will add in value object we can access it to any component
    
//     const currenySymbol = "$";
//     const value ={
//         doctors,
//         currenySymbol
//     }

//     return (
//         <AppContext.Provider value ={value}>
//             {props.children}
//         </AppContext.Provider>
//     );
// }

// export default AppContextProvider

// ************************************************************************

// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [doctors, setDoctors] = useState([]);
//   const currencySymbol = "₹"; // Change to ₹ or $ as you like

//   // ✅ Fetch all doctors from backend
//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get(import.meta.env.VITE_URL + "/api/user/doctors");
//       console.log("✅ Doctors fetched:", response.data.doctors);
//     //   setDoctors(response.data.doctors || []);
//     console.log("✅ Full backend response:", response.data);

//     } catch (error) {
//       console.error("❌ Error fetching doctors:", error.response?.data || error.message);
//     }
//   };

//   // ✅ Fetch when app starts
//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const value = {
//     doctors,
//     currencySymbol,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;



import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const currencySymbol = "₹";

  const fetchDoctors = async () => {
    try {
      const backendUrl = import.meta.env.VITE_URL || import.meta.env.VITE_BACKEND_URL || "http://localhost:8989";
      const response = await axios.get(`${backendUrl}/api/user/doctors`);
      console.log("✅ Full backend response:", response.data);
      console.log("🌍 Backend URL:", backendUrl);

      // Adjust key name depending on your backend
      const fetchedDoctors = response.data.doctors || response.data.doctor || [];
      console.log("✅ Doctors fetched:", fetchedDoctors);

      setDoctors(fetchedDoctors);
    } catch (error) {
      console.error("❌ Error fetching doctors:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;



