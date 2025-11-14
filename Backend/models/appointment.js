// const {mongoose} = require("mongoose");

// const appointmentSchema = new mongoose.Schema({
//     userId:{
//         type:String,
//     },
//     docId:{
//         type:String,
//         required: true, 
//     },
//     slotDate:{
//         type:String,
//         required: true,
//     },
//     slotTime:{
//         type:String,
//         required: true,
//     },
//     userData:{
//         type:Object,
        
//     },
//     docData:{
//         type:Object,
//         required:true
//     },
//     amount:{
//         type:Number,
//         required:true
//     },
//     date:{
//         type : Number,
//         required:true
//     },
//     cancelled:{
//         type:Boolean,
//         default:false
//     },
//     payment:{
//         type:Boolean,
//         default:false  
//     },
//     isCompleted:{
//         type:Boolean,
//         default:false  
//     }
// })

// const appointmentModel = new mongoose.model("Appointment",appointmentSchema);

// module.exports = {appointmentModel}



// **********************NEW*************************************************************************

// models/Appointment.js (Example Mongoose Schema)



const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  patientName: {
    type: String,
    required: true,
  },

  patientPhone: {
    type: String,
    required: true,
  },

  appointmentDate: {
    type: String,   // YYYY-MM-DD
    required: true,
  },

  appointmentTime: {
    type: String,   // "08:00 PM"
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("appointments", appointmentSchema);

// ****************************************************************************************************
// const mongoose = require('mongoose');

// const AppointmentSchema = new mongoose.Schema({
//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Doctor",
//     required: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   slotDate: { type: String, required: true },
//   slotTime: { type: String, required: true },
//   amount: Number,
//   cancelled: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Appointment", AppointmentSchema);
