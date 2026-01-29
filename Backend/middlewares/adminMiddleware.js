// const express = require("express");
// const jwt = require("jsonwebtoken")


// const adminMiddlewareRouter = async(req, res , next) =>{
// try {
//     const cookie = req.cookies;
    
    
//     const token  = cookie?.adminToken;
//     if(!token) return res.status(400).json({message : "Request Denied!! Token is Invalid!!"})
    
//     const decoded =  await jwt.verify(token , process.env.JWT_SECRET_KEY );
//     if(!decoded)  return res.status(400).json({message : "Something wrong in token verification!!"})
//     const email = decoded.email;
//     if(email != process.env.ADMIN_EMAIL)return res.status(400).json({message : "Something wrong in token verification!!"})
//     next();
    
// } catch (error) {
//     return res.status(400).json({message : error.message})
// }
// }

// module.exports = {adminMiddlewareRouter}

// ********************
// const jwt = require("jsonwebtoken");

// const adminMiddlewareRouter = async (req, res, next) => {
//   try {
//     // 1️⃣ Read token from cookie
//     let token = req.cookies?.adminToken;

//     // 2️⃣ If not in cookie, read from Authorization header
//     if (!token && req.headers.authorization?.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // 3️⃣ No token found
//     if (!token) {
//       return res.status(400).json({ message: "Request Denied!! Token Missing!!" });
//     }

//     // 4️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if (!decoded || decoded.email !== process.env.ADMIN_EMAIL) {
//       return res.status(400).json({ message: "Invalid Token!!" });
//     }

//     // 5️⃣ Store admin details if needed
//     req.admin = decoded;

//     next();
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { adminMiddlewareRouter };

// *************************************************

const jwt = require("jsonwebtoken");

const adminMiddlewareRouter = (req, res, next) => {
  try {
    // 1️⃣ Read token from cookie
    let token = req.cookies?.adminToken;

    // 2️⃣ If not in cookie, read from Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ No token found
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // 5️⃣ Store admin details if needed
    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Token expired or invalid" });
  }
};

module.exports = { adminMiddlewareRouter };
