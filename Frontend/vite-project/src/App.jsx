// import React from 'react'
// import {Routes,  Route} from 'react-router-dom'
// import Home from './pages/Home'
// import { Doctors } from './pages/Doctors'
// import Login from './pages/Login'
// import Signup from './pages/signup' 
// import About from './pages/About'
// import Contact from './pages/contact'
// import Myprofile from './pages/Myprofile'
// import Myappoinment from './pages/Myappoinment'
// import Appointment from './pages/Appointment'
// import Navbar from './components/Navbar'
// import { Footer } from './components/Footer'
// import ProtectedRoute from './components/ProtectedRoute';


// const App = () => {
//   return (

//   <div className='mx-4 sm:mx-[10%]'>
//     <Navbar/>

//   <Routes>
//     <Route path='/' element={<Home/>}/>
//     <Route path='/doctors' element={<Doctors/>}/>
//     <Route path='/doctors/:speciality' element={<Doctors/>}/>
//     <Route path='/login' element={<Login/>}/>
//     <Route path='/signup' element={<Signup/>}/>
//     <Route path='/about' element={<About/>}/>
//     <Route path='/contact' element={<Contact/>}/>
//     <Route path='/myprofile' element={<Myprofile/>} />
//     <Route path='/my-appointment' element={<Myappoinment/>} />
//     <Route path='/appointment/:docId' element={<Appointment/>} />

// {/* 🔒 Protected routes start here */}

// <Route
//     path='/myprofile'
//     element={
//       <ProtectedRoute>
//         <Myprofile />
//       </ProtectedRoute>
//     }
//   />
//   <Route
//     path='/my-appointment'
//     element={
//       <ProtectedRoute>
//         <Myappoinment />
//       </ProtectedRoute>
//     }
//   />
//   <Route
//     path='/appointment/:docId'
//     element={
//       <ProtectedRoute>
//         <Appointment />
//       </ProtectedRoute>
//     }
//   />
//   </Routes>
//   <Footer/>
 
//   </div>

//   )
// }

// export default App


// *****************************************
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Doctors } from "./pages/Doctors";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./pages/Myprofile";
import Myappoinment from "./pages/MyAppoinments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AppContextProvider from "./context/AppContext";


const App = () => {
  return (
    <AppContextProvider>

  
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Home should be visible ONLY after login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ✅ Other Protected Routes */}
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/:speciality"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <Myprofile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <Myappoinment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment/:docId"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
      </AppContextProvider>
  );
};

export default App;
