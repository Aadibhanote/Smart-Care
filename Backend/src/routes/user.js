// const express = require("express");
// const userRouter = express.Router();
// const {validateUserdata} = require("../../utils/validation")
// const bcrypt = require("bcrypt");
// // const { UserModel } = require("../../models/user");
// // const UserModel = require("../../models/user");
// const { UserModel } = require("../../models/user");


// const validator = require("validator");
// const{userAuthMiddlware} = require("../../middlewares/userMiddleware");
// const{validEditData} = require("../../utils/validation");
// const { DoctorModel } = require("../../models/doctor");
// const {appointmentModel} = require("../../models/appointment")

// // ✅ Public route: Fetch all available doctors (for user side)
// userRouter.get("/doctors", async (req, res) => {
//   try {
//     const doctors = await DoctorModel.find({ available: true }).select("-password");
//     if (doctors.length === 0)
//       return res.status(200).json({ success: true, message: "No doctors found", doctors: [] });

//     return res.status(200).json({ success: true, doctors });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });


// userRouter.post("/signup",async (req,res) =>{

//   try {
//     const {email , password , firstName , lastName , gender} = req.body;
//     // const isDataValid = validateUserdata(req);
//     // if(!isDataValid) return res.status(404).json({ERROR : "Invalid Data!!"})

//     const hashPass = await bcrypt.hash(password , 10);

//     const user = new UserModel({
//         email , password:hashPass , firstName , lastName , gender
//     })
//     await user.save();
//     console.log(user);
    
//     return res.status(200).json({success:true , user})
    
//   } catch (error) {
//     return res.status(400).json({Error : error.message})
//   }

// })

// // userRouter.post("/login" , async(req,res) =>{
// //     try {
        
// //         const{email , password} = req.body;
        
// //         //if(!validator.isEmail(email))  return res.status(404).json({message: "Invalid Email type"}) 
// //         //if(password.length< 3) return  res.status(404).json({message: "make Strong Password"})

// //         const user = await UserModel.findOne({email : email})
        
        
// //         const validate = await user.validatePassword(password);
// //         if(!validate || !user)   return res.status(404).json({ERROR : "Invalid Credential!!"})
        
// //         else{
// //             const token = await user.getJWT();
// //             if(!token ) return res.status(400).json({Error : "Something Wrong in token!!"})
            
// //             res.cookie("userToken",token);
// //             return res.status(200).json({message : "Login Sucessful !!"})

// //         }

// //     } catch (error) {
// //         return res.status(400).json({Error : error.message}) 
// //     }
// // } )
// userRouter.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Check if user exists
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found!" });
//     }

//     // ✅ Validate password
//     const isPasswordValid = await user.validatePassword(password);
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials!" });
//     }

//     // ✅ Generate JWT
//     const token = user.getJWT();

//     // ✅ Set cookie for persistence
//     res.cookie("userToken", token, {
//       httpOnly: true,
//       secure: false, // change to true in production (HTTPS)
//       sameSite: "lax",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Login successful!",
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: error.message });
//   }
// });




// userRouter.post("/logout" , userAuthMiddlware , async (req,res) =>{
//     try {
//         res.cookie("userToken" , null , {expires : new Date(Date.now())})
//         return res.status(200).json({message : "Logout Sucessfull!!"})
//     } catch (error) {
//         return res.status(400).json({Error : error.message}) 
//     }
// })

// userRouter.get("/allDoctors" ,userAuthMiddlware, async(req,res) =>{
//     try {
//    const doctor =  await DoctorModel.find({}).select("-password ");
//    if(!doctor) return res.status(400).json({message : "No Doctor Available !!"})
//     return res.status(200).json({message:"List All Doctors" , doctor})
        
//     } catch (error) {
//         return res.status(400).json({ERROR: error.message})
//     }
// })

// userRouter.get("/user/doctor/:Id" ,  userAuthMiddlware , async(req ,res)=>{
//     try {
        
//        const docId = req.params.Id;
//         const doctorProfile =  await DoctorModel.findById(docId).select("-password");
        
//         return res.json({doctorProfile})

//     } catch (error) {
//         return res.json({ERROR : error.message})

//     }
// })


// userRouter.patch("/user/editProfile" , userAuthMiddlware , async (req,res)=>{
//     try {
//        if(!validEditData(req)) return res.status(404).json({message : "Editing not allowed for that some field!!"}) 
        
//       const loggedInUser = req.user;
      

//       Object.keys(req.body).forEach((key)=>{
//         loggedInUser[key] = req.body[key];
//       })
//       await loggedInUser.save();
//       return res.status(200).json({message : "Profile Edited Sucessfull !!"})
      
//     } catch (error) {
//         return res.status(400).json({Error : error.message})
//     }
// })
// userRouter.get("/user/viewProfile", userAuthMiddlware ,  async (req , res) =>{

//     try {
//         const loggedInUser = req.user.toObject();
//         delete loggedInUser.password;
//         return res.status(200).json(loggedInUser);
        
//     } catch (error) {
//         return res.status(400).json({Error : error.message})
//     }
// })
// userRouter.patch("/user/editPassword" , userAuthMiddlware , async (req, res)=>{
//     try {
//         const user = req.user;
//         const { oldPass , newPass } = req.body;

//         const isValid =  await user.validatePassword(oldPass);

//         if(!isValid) return res.status(404).json({message : "Invalid old Password!!"});
//         else{
//         const hashPassword  =  await bcrypt.hash(newPass , 10);
//         user.password = hashPassword;
//         await user.save();
//         return res.status(200).json({message : "Password edited Sucessfull !!"})
//         }
//     } catch (error) {
//         return res.status(400).json({Error : error.message})
//     }
// })

// userRouter.post("/bookAppointment", userAuthMiddlware,async (req,res)=>{
//   try {
//     const loggedInUser = req.user;
//     const userId = loggedInUser._id;
//     const{docId , slotDate , slotTime} = req.body;
    
//     const docData = await DoctorModel.findById(docId).select("-password");
//     if(!docData.available){
//      return res.json({message : "Doctor Not Available!!"})
//     }else{
//         var slots_booked = docData.slots_booked || {};
 
//      //check if slot is available or not
//      if(slots_booked[slotDate]){

//           if(slots_booked[slotDate].include(slotTime)){
//              return res.json({message : "Slot Not Available!!"})  
//          }else{
//              slots_booked[slotDate].push(slotTime)
//          }

//      }else{
//          slots_booked[slotDate] = [];
//          slots_booked[slotDate].push(slotTime);
//       }
//     }
//     const user = await UserModel.findById(userId).select("-password");
//     //delete slotbook data in doctor
//     //we donot want the slot book of doctor data

//     delete docData.slots_booked;
//     const appointmentData = {
//         userId, docId , user , docData , amount :docData.fees , date : Date.now() , slotDate , slotTime  
//     }

//     const newAppointment  = new appointmentModel(appointmentData);
//     await newAppointment.save();

//     //save new slots data in docData
//     await DoctorModel.findById(docId , {slots_booked})
//     return res.json({sucess :true , message : "Appontment booked" , newAppointment})

//   } catch (error) {
//     return res.status(400).json({Error : error.message})
//   }
// })

// // userRouter.get("/user/appointment", userAuthMiddlware, async (req, res) => {
// //     try {
// //         const user = req.user; 
// //         const userId = user._id; 

// //         const appointments = await appointmentModel.find({ userId: userId});

// //         if (appointments.length === 0) {
// //             return res.status(404).json({ message: "User doesn't have any appointments!" });
// //         }

// //         return res.status(200).json({
// //             message: "Appointments for " + user.firstName, 
// //             appointments
// //         });
// //     } catch (error) {
// //         return res.status(400).json({ Error: error.message });
// //     }
// // });



// userRouter.patch("/user/cancelAppointment/:appointmentId", userAuthMiddlware, async (req, res) => {
//     try {
//         const loggedInUser = req.user;
//         const userId = loggedInUser._id.toString(); 
//         const appointmentId = req.params.appointmentId;


//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (!appointmentData) {
//             return res.status(404).json({ message: "Appointment not found!" });
//         }

//         if (appointmentData.userId.toString() !== userId) { 
//             return res.status(403).json({ message: "User doesn't have this appointment!" });
//         }

//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

//         // Release the doctor slot
//         const { docId, slotDate, slotTime } = appointmentData;
//         const docData = await DoctorModel.findById(docId);
//         if (!docData) {
//             return res.status(404).json({ message: "Doctor not found!" });
//         }

//         // Update slots_booked
//         let slots_booked = docData.slots_booked || {};
//         if (slots_booked[slotDate]) {
//             slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
//         }

//         // Save the updated slots back to the doctor data
//         docData.slots_booked = slots_booked;
//         await docData.save();

//         return res.json({ message: "Appointment cancelled!" });

//     } catch (error) {
//         return res.status(400).json({ Error: error.message });
//     }
// });


// //Payment  : 11:40:00


// module.exports = {userRouter};

// *******************************************************************************************************
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const { UserModel } = require("../../models/user");
const { DoctorModel } = require("../../models/doctor");
// const { appointmentModel } = require("../../models/appointment");
const appointmentModel = require("../../models/appointment");

const { validateUserdata, validEditData } = require("../../utils/validation");
const { userAuthMiddlware } = require("../../middlewares/userMiddleware");
const Donation = require("../../models/donation");


// ✅ Public route: Fetch all available doctors
userRouter.get("/doctors", async (req, res) => {
  try {
    const doctors = await DoctorModel.find({ available: true }).select("-password");
    return res.status(200).json({
      success: true,
      doctors,
      message: doctors.length ? "Doctors fetched successfully" : "No doctors found",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Signup
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, gender } = req.body;

    if (!email || !password || !firstName || !lastName || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered!" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashPass, firstName, lastName, gender });
    await user.save();

    return res.status(200).json({ success: true, message: "Signup successful!", user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid)
      return res.status(401).json({ success: false, message: "Invalid credentials!" });

    const token = user.getJWT();

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: false, // set true for production HTTPS
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Logout
userRouter.post("/logout", userAuthMiddlware, async (req, res) => {
  try {
    res.cookie("userToken", null, { expires: new Date(Date.now()) });
    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// ✅ View profile
userRouter.get("/profile", userAuthMiddlware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
userRouter.put("/profile", userAuthMiddlware, async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ success: true, user: updatedUser });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});




// ✅ Book appointment
userRouter.post("/bookAppointment", userAuthMiddlware, async (req, res) => {
  try {
    const { doctorId, patientName, patientPhone, appointmentDate, appointmentTime, status } = req.body;

    if (!doctorId || !patientName || !patientPhone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      });
    }

    const docData = await DoctorModel.findById(doctorId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found!" });
    }

    if (!docData.available) {
      return res.status(400).json({ success: false, message: "Doctor not available!" });
    }

    const newAppointment = new appointmentModel({
      doctorId,
      userId: req.user._id,
      patientName,
      patientPhone,
      appointmentDate,
      appointmentTime,
      status: status || "Pending",
    });

    await newAppointment.save();

    return res.json({
      success: true,
      message: "Appointment booked successfully!",
      newAppointment,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


// ✅ Fetch logged-in user appointments
// userRouter.get("/appointment", userAuthMiddlware, async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const appointments = await appointmentModel
//       .find({ userId })
//       .populate("doctorId", "firstName lastName speciality fees image");

//     if (!appointments.length)
//       return res.status(404).json({ message: "No appointments found!" });

//     return res.status(200).json({ success: true, appointments });

//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });
// userRouter.get("/appointment", userAuthMiddlware, async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const appointments = await appointmentModel
//       .find({ userId })
//       .populate("doctorId", "firstName lastName speciality image fees");

//     return res.status(200).json({
//       success: true,
//       appointments,
//     });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });
userRouter.get("/appointment", userAuthMiddlware, async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 })  // ⬅️ SORT BY LATEST FIRST
      .populate("doctorId", "firstName lastName speciality image fees");

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
//  Donate

userRouter.post(
  "/registerDonation",
  userAuthMiddlware,
  async (req, res) => {
    try {
      const donation = new Donation({
        userId: req.user._id, // coming from middleware
        ...req.body,
      });

      await donation.save();

      return res.status(201).json({
        success: true,
        message: "Donation registered successfully",
        donation,
      });
    } catch (error) {
      console.error("Donation Error:", error);

      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors || null,
      });
    }
  }
);

// Donations
// Get all available donations (for all users)
userRouter.get("/donations", userAuthMiddlware, async (req, res) => {
  try {
    const donations = await Donation.find({ available: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      donations,
    });
  } catch (error) {
    console.error("Fetch Donations Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
});



// ✅ Cancel appointment
userRouter.patch("/cancelAppointment/:appointmentId", userAuthMiddlware, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user._id;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData)
      return res.status(404).json({ message: "Appointment not found!" });

    if (appointmentData.userId.toString() !== userId.toString())
      return res.status(403).json({ message: "You cannot cancel this appointment!" });

    appointmentData.cancelled = true;
    await appointmentData.save();

    const docData = await DoctorModel.findById(appointmentData.docId);
    if (docData?.slots_booked?.[appointmentData.slotDate]) {
      docData.slots_booked[appointmentData.slotDate] =
        docData.slots_booked[appointmentData.slotDate].filter(
          (e) => e !== appointmentData.slotTime
        );
      await docData.save();
    }

    return res.json({ message: "Appointment cancelled successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
