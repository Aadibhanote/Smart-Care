// const express = require("express");
// const adminRouter = express.Router();
// const bcrypt = require("bcrypt");
// const { DoctorModel } = require("../../models/doctor");
// const {validateDoctorAddData} =  require("../../utils/validation")
// const jwt = require("jsonwebtoken")
// const {adminMiddlewareRouter} = require("../../middlewares/adminMiddleware")
// const {appointmentModel} =  require("../../models/appointment")
// const {UserModel} =  require("../../models/user")

// //login thisia test
// adminRouter.post("/login", async (req, res) =>{
//     try {
//         const {email , password } =  req.body;
//         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

//         const token =  jwt.sign({email} , process.env.JWT_SECRET_KEY, {expiresIn : "1d"});
//         if(!token) return res.status(400).json({message : "ERROR WHILE CREATING TOKEN!!"})
      
//         res.cookie("adminToken", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         }); 

//         return res.status(200).json({success: true , message : "Login Sucessfull!!" , token})

//         }else{
//             return res.json({message: "Invalid Credentials!!"})
//         }
        
//     } catch (error) {
//         return res.status(400).json({ERROR : error.message})
//     }
// })
// adminRouter.post("/add-doctor", adminMiddlewareRouter, async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       image,
//       speciality,
//       degree,
//       experience,
//       about,
//       available,
//       fees,
//       address,
//       slots_booked,
//     } = req.body;

//     const hashPassword = await bcrypt.hash(password, 10);
//     const doctorData = new DoctorModel({
//       firstName,
//       lastName,
//       email,
//       password: hashPassword,
//       image,
//       speciality,
//       degree,
//       experience,
//       about,
//       available,
//       fees,
//       address,
//       slots_booked: slots_booked || {},
//     });

//     await doctorData.save();
//     res.status(200).json({ message: "Doctor Added Successfully!!", data: doctorData });
//   } catch (error) {
//     res.status(500).json({ ERROR: error.message });
//   }
// });


// // adminRouter.post("/add-doctor",adminMiddlewareRouter, async (req, res) => {
// //   try {
// //     const {
// //       firstName,
// //       lastName,
// //       email,
// //       password,
// //       image,
// //       speciality,
// //       degree,
// //       experience,
// //       about,
// //       available,
// //       fees,
// //       address,
// //       slots_booked,
      
// //     } = req.body;

// //     //validate data
// //     const validationErrors = validateDoctorAddData(req); // fixed name
// //     if (validationErrors) {
// //       return res.status(400).json({ ERROR: validationErrors });
// //     }
    


// //     //hash password
// //     const hashPassword = await bcrypt.hash(password, 10);

// //     const doctorData = new DoctorModel({
// //       firstName,
// //       lastName,
// //       email,
// //       password : hashPassword ,
// //       image,
// //       speciality,
// //       degree,
// //       experience,
// //       about,
// //       available,
// //       fees,
// //       address,
// //       slots_booked: typeof slots_booked === 'string' ? JSON.parse(slots_booked) : slots_booked,
// //     });

// //     await doctorData.save();
// //     return res.status(200).json({message :  "Doctor Added Successfully!!" , data : doctorData})
// //   } catch (error) {
// //     return res.status(500).json({ERROR: error.message})
// //   }
// // });

// // adminRouter.get("/allDoctors" ,adminMiddlewareRouter, async(req,res) =>{
// //     try {
// //    const doctor =  await DoctorModel.find({}).select("-password ");
// //    if(!doctor) return res.status(400).json({message : "No Doctor Available !!"})
// //     return res.status(200).json({message:"List All Doctors" , doctor})
        
// //     } catch (error) {
// //         return res.status(400).json({ERROR: error.message})
// //     }
// // })
// adminRouter.post("/changeAvailability/:id", adminMiddlewareRouter, async (req, res) => {
//   try {
//     const doctor = await DoctorModel.findById(req.params.id);
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: "Doctor not found!" });
//     }

//     doctor.available = !doctor.available; // flip current status
//     await doctor.save();

//     return res.status(200).json({
//       success: true,
//       message: `Doctor is now ${doctor.available ? "Available" : "Unavailable"}.`,
//       available: doctor.available,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });


// adminRouter.post("/changeAvailability/:id", adminMiddlewareRouter, async (req, res) => {
//   try {
//     const doctor = await DoctorModel.findById(req.params.id);
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: "Doctor not found!" });
//     }

//     // ✅ Flip availability
//     doctor.available = !doctor.available;
//     await doctor.save();

//     return res.status(200).json({
//       success: true,
//       message: `Doctor is now ${doctor.available ? "Available" : "Unavailable"}.`,
//       available: doctor.available,
//     });
//   } catch (error) {
//     console.error("Error changing availability:", error.message);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

// adminRouter.patch("/cancelAppointment/:appointmentId" ,adminMiddlewareRouter, async(req,res) =>{
//   try {
      
//       const appointmentId =  req.params.appointmentId;
//       const appointmentData =  await appointmentModel.findById(appointmentId);

//       await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true})
  
//      // release the doctor slot
//      const {docId , slotDate , slotTime} = appointmentData;
//      const docData = await DoctorModel.findById(docId);
//      let slots_booked = docData.slots_booked;
     
//      if (slots_booked[slotDate]) {
//       slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
//     }

//      await DoctorModel.findByIdAndUpdate(docId , {slots_booked})

//      return res.json({message : "Appontment Cancelled!!"})
//       }



//    catch (error) {
//       return res.status(400).json({Error : error.message})
//   }
// })

// //all appointment list
// adminRouter.get("/allAppointments" ,adminMiddlewareRouter ,  async(req, res)=>{

//   try {
//      const appointments =  await appointmentModel.find({})
//      if(!appointments) return res.status(200).json({message : "No Appointments till now!!"})
//      return res.status(200).json({appointments});

//   } catch (error) {
//      return res.status(400).json({Error : error.message})
//   }

// })

// //dashboard data
// adminRouter.get("dashData" , adminMiddlewareRouter ,async (req,res)=>{
//   try {
//     const doctors =  await DoctorModel.find({});
//     const user = await UserModel.find({});
//     const appointments =  await appointmentModel.find({});

//     const dashData={
//       doctors : doctors.length,
//       appointments :  appointments.length,
//       user :  user.length,
//       latestAppointments : appointments.reverse().slice(0,5)
//     }


//    return res.json({dashData}) 
//   } catch (error) {
//     return res.status(400).json({Error : error.message})
  
//   }
// })

// module.exports = {adminRouter}








// ***************************************

const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { DoctorModel } = require("../../models/doctor");
const { validateDoctorAddData } = require("../../utils/validation");
const { adminMiddlewareRouter } = require("../../middlewares/adminMiddleware");
const  appointmentModel  = require("../../models/appointment");
const { UserModel } = require("../../models/user");
const Donation  = require("../../models/donation");



// ======================= ADMIN LOGIN =======================
adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: false,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    }

    return res.status(400).json({ message: "Invalid credentials!" });

  } catch (error) {
    return res.status(500).json({ ERROR: error.message });
  }
});


// ======================= ADD DOCTOR =======================
adminRouter.post("/add-doctor", adminMiddlewareRouter, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      slots_booked,
    } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const doctor = new DoctorModel({
      firstName,
      lastName,
      email,
      password: hashed,
      image,
      speciality,
      degree,
      experience,
      about,
      available: available ?? true,   // default available
      fees,
      address,
      slots_booked: slots_booked || {},
    });

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Doctor Added Successfully!",
      doctor,
    });

  } catch (error) {
    return res.status(500).json({ ERROR: error.message });
  }
});


// ======================= GET ALL DOCTORS =======================
adminRouter.get("/allDoctors", adminMiddlewareRouter, async (req, res) => {
  try {
    const doctors = await DoctorModel.find().select("-password");

    return res.status(200).json({
      success: true,
      doctors,
    });

  } catch (error) {
    return res.status(500).json({ ERROR: error.message });
  }
});


// ================== CHANGE DOCTOR AVAILABILITY ==================
adminRouter.post("/changeAvailability/:id", adminMiddlewareRouter, async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found!" });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    return res.status(200).json({
      success: true,
      message: doctor.available ? "Doctor is now Available" : "Doctor is now Unavailable",
      available: doctor.available,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


// ======================= CANCEL APPOINTMENT =======================
adminRouter.patch("/cancelAppointment/:appointmentId", adminMiddlewareRouter, async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctor = await DoctorModel.findById(docId);

    let slots = doctor.slots_booked;

    if (slots[slotDate]) {
      slots[slotDate] = slots[slotDate].filter((t) => t !== slotTime);
    }

    await DoctorModel.findByIdAndUpdate(docId, { slots_booked: slots });

    return res.json({ message: "Appointment Cancelled!" });

  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
});


// ======================= DASHBOARD DATA =======================
adminRouter.get("/", adminMiddlewareRouter, async (req, res) => {
  try {
    // console.log("DoctorModel:", DoctorModel);
    // console.log("UserModel:", UserModel);
    // console.log("appointmentModel:", appointmentModel);
    // console.log("Donation:", Donation);

    const doctors = await DoctorModel.find({});
    const users = await UserModel.find({});
    const appointments = await appointmentModel.find({});
    const donations = await Donation.find({});

    const data = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      donations: donations.length,
      latestAppointments: appointments.reverse().slice(0, 5),
      latestDonations: donations.reverse().slice(0, 5),
    };

    return res.json({ data });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({ Error: error.message });
  }
});

adminRouter.get("/donations", adminMiddlewareRouter, async (req, res) => {
  try {
    const donations = await Donation.find({}).sort({ date: -1 });
    return res.json({ data: donations });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});






module.exports = { adminRouter };
// models/donation.js
// 

