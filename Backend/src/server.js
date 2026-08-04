// require('dotenv').config();
// const PORT = process.env.PORT || 1234
// const express = require("express");
// const app = express();
// const{ConnectMongoDB} = require("./config/database");
// const {connectCloudinary} =   require("./config/cloudnary")
// const{adminRouter}  =  require("./routes/admin");
// const cookieParser =  require("cookie-parser");
// const { doctorRouter } = require('./routes/doctor');
// const {userRouter} = require("../src/routes/user")
// const {RequestRouter} = require ("./routes/Request")
// // Add this line with your other "require" statements
// const appointmentRouter = require('./routes/appointmentRoutes');
// const cors = require("cors");

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

// connectCloudinary().catch(error => {
//     console.error(`Cloudinary connection error: ${error}`);
// });

// app.use('/api/appointments', appointmentRouter); 
// app.use('/api/admin', adminRouter);
// app.use('/api/doctor', doctorRouter);
// app.use('/api/user', userRouter);

// // app.use("/",adminRouter);
// // app.use("/" , doctorRouter);
// // app.use("/",userRouter);
// // app.use("/",RequestRouter);




// ConnectMongoDB().then(()=>{
//     console.log(`DB Connected Sucessfully!!`);
//     app.listen(PORT,()=>console.log(`Server Started!!`)
//     ) 
// }).catch((error) =>{
//     console.log(`Something Wrong In MongoDB Connection : ${error}`); 
// })


// **********************************************************NEW/******************* */
// src/server.js (CORRECTED CODE)

// require('dotenv').config();
// const PORT = process.env.PORT || 1234
// const express = require("express");
// const app = express();
// const {ConnectMongoDB} = require("./config/database");
// const {connectCloudinary} = require("./config/cloudnary")

// // FIX 1: Use curly braces for all named exports to get the function, not the object.
// const {adminRouter}  = require("./routes/admin"); // FIXED
// const cookieParser = require("cookie-parser");

// // FIX 2: Use curly braces and correct paths (since server.js is in src, use relative paths)
// const { doctorRouter } = require('./routes/doctor');
// const {userRouter} = require("./routes/user"); // Corrected path from ../src/routes/user
// const {RequestRouter} = require ("./routes/Request"); // FIXED
// const { appointmentRouter } = require('./routes/appointmentRoutes'); // FIXED (using curly braces)

// const cors = require("cors");

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

// connectCloudinary().catch(error => {
//     console.error(`Cloudinary connection error: ${error}`);
// });

// // ROUTE MOUNTING
// app.use('/api/appointments', appointmentRouter); 
// app.use('/api/admin', adminRouter);
// app.use('/api/doctor', doctorRouter);
// app.use('/api/user', userRouter);
// app.use('/api/requests', RequestRouter); // Assuming RequestRouter is useful

// // ... (rest of server startup)

// ConnectMongoDB().then(()=>{
//     console.log(`DB Connected Sucessfully!!`);
//     app.listen(PORT,()=>console.log(`Server Started!!`)
//     ) 
// }).catch((error) =>{
//     console.log(`Something Wrong In MongoDB Connection : ${error}`); 
// })


// *******************************NEW***************************************************************************************
// src/server.js
// src/server.js (FINAL CORRECTED IMPORTS)

// require('dotenv').config();
// const PORT = process.env.PORT || 1234
// const express = require("express");
// const app = express();
// const {ConnectMongoDB} = require("./config/database");
// const {connectCloudinary} = require("./config/cloudnary")

// // --- FIX: USE NAMED IMPORTS {} FOR ALL ROUTERS ---
// const {adminRouter}  =  require("./routes/admin"); // FIX: Ensures named import
// const cookieParser = require("cookie-parser");

// const { doctorRouter } = require('./routes/doctor'); // FIX: Ensures named import
// const {userRouter} = require("./routes/user"); // FIX: Ensures named import
// const {RequestRouter} = require ("./routes/Request"); // FIX: Ensures named import
// // const { appointmentRouter } = require('./routes/appointmentRoutes'); // Ensures named import
// // This { } pulls the router function from the object
// const { appointmentRouter } = require('./routes/appointmentRoutes');

// const cors = require("cors");

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

// connectCloudinary().catch(error => {
//     console.error(`Cloudinary connection error: ${error}`);
// });

// // ROUTE MOUNTING (The paths are now correctly mounted to API endpoints)
// app.use('/api/appointments', appointmentRouter); 
// app.use('/api/admin', adminRouter);
// app.use('/api/doctor', doctorRouter);
// app.use('/api/user', userRouter);
// app.use('/api/requests', RequestRouter); 

// ConnectMongoDB().then(()=>{
//     console.log(`DB Connected Sucessfully!!`);
//     app.listen(PORT,()=>console.log(`Server Started!!`)
//     ) 
// }).catch((error) =>{
//     console.log(`Something Wrong In MongoDB Connection : ${error}`); 
// })


// **************************************************************************************************************

require('dotenv').config();
const PORT = process.env.PORT || 8989 ;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const contactRouter = require("./routes/contact");

// 🧩 Import custom modules
const { ConnectMongoDB } = require("./config/database");
const { connectCloudinary } = require("./config/cloudnary");

// 🧩 Import all routers (named imports)
const { adminRouter } = require("./routes/admin");
const { doctorRouter } = require("./routes/doctor");
const { userRouter } = require("./routes/user");
const { RequestRouter } = require("./routes/Request");
const { appointmentRouter } = require("./routes/appointmentRoutes");

// console.log("adminRouter:", adminRouter);
// console.log("doctorRouter:", doctorRouter);
// console.log("userRouter:", userRouter);
// console.log("RequestRouter:", RequestRouter);
// console.log("appointmentRouter:", appointmentRouter);

// Build allowed origins list: localhost + Vercel production & preview URLs
const allowedOrigins = [
  "http://localhost:5173", // user portal local
  "http://localhost:5188", // admin panel local
  "http://localhost:3000", // doctor portal local
  "https://smart-care-frontend-sooty.vercel.app", // user portal vercel
  "https://smart-care-admin-pink.vercel.app",      // admin panel vercel
];

const prodOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

const allAllowedOrigins = [...allowedOrigins, ...prodOrigins];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allAllowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Allow origin dynamically so cross-origin requests succeed
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // ✅ allow cookies + auth headers
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ allow JWT headers
  })
);


// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Connect Cloudinary
connectCloudinary().catch((error) => {
  console.error(`Cloudinary connection error: ${error}`);
});
app.use(express.urlencoded({ extended: true }));
// ✅ Mount routes
app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/requests", RequestRouter);
app.use("/api/contact", contactRouter);
// app.use("/api/user", require("./routes/userRoutes"));


// ✅ Connect MongoDB and Start Server
ConnectMongoDB()
  .then(() => {
    console.log("✅ DB Connected Successfully!");
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`❌ MongoDB Connection Error: ${error}`);
  });
  module.exports=app;


// *********************************versel*************
// require('dotenv').config();
// const PORT = process.env.PORT;   // Render will provide PORT
// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const { ConnectMongoDB } = require("./config/database");
// const { connectCloudinary } = require("./config/cloudnary");

// const { adminRouter } = require("./routes/admin");
// const { doctorRouter } = require("./routes/doctor");
// const { userRouter } = require("./routes/user");
// const { RequestRouter } = require("./routes/Request");
// const { appointmentRouter } = require("./routes/appointmentRoutes");

// // Production CORS (recommended later)
// app.use(
//   cors({
//     origin: [
//       // "http://localhost:5173",
//       "https://smart-care-ruby.vercel.app"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// connectCloudinary().catch(error => {
//   console.error(`Cloudinary connection error: ${error}`);
// });

// app.use("/api/appointments", appointmentRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);
// app.use("/api/requests", RequestRouter);

// ConnectMongoDB()
//   .then(() => {
//     console.log("✅ DB Connected Successfully!");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(error => {
//     console.log(`❌ MongoDB Error: ${error}`);
//   });
