// const jwt = require("jsonwebtoken");
// const { UserModel } = require("../models/user");

// const userAuthMiddlware = async(req,res, next) =>{
//   try {
     
//     const cookie =  req.cookies;
//     const token  = cookie?.userToken;
//     if(!token) return res.status(400).json({message : "Invalid Token!!"})

//     const verify = await jwt.verify(token , process.env.JWT_SECRET_KEY);
//     if(!verify) return res.status(400).json({message : "Token not valid!!"});

//     const id = verify._id;
//     const user = await UserModel.findOne(id);
//     if(!user) return res.json({message : "User not find!!"})
//     req.user = user;
//     next();
    
//   } catch (error) {
//     return res.send("ERROR :"+error.message)
//   }

// }

// module.exports = {userAuthMiddlware}

// *****************************NEW*****************************
// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user");

// const userAuthMiddlware = async (req, res, next) => {
//   try {
//     const token = req.cookies?.userToken || req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await UserModel.findById(decoded.id);

//     if (!user) return res.status(404).json({ message: "User not found!" });

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token." });
//   }
// };

// module.exports = { userAuthMiddlware };
// ***********************************************************************
// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user");

// const userAuthMiddlware = async (req, res, next) => {
//   try {
//     // ✅ Try to read the token from either cookie or Authorization header
//     const token =
//       req.cookies?.userToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     // ✅ Verify JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     if (!decoded || !decoded.id) {
//       return res.status(401).json({ message: "Invalid token." });
//     }

//     // ✅ Find user in DB
//     const user = await UserModel.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // ✅ Attach user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized! Invalid or expired token.",
//       error: error.message,
//     });
//   }
// };

// module.exports = { userAuthMiddlware };


// ****************************************************************************************
const jwt = require("jsonwebtoken");
const{ UserModel} = require("../models/user");

const userAuthMiddlware = async (req, res, next) => {
  try {
    let token;

    // ✅ First priority: Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ✅ Fallback: check in cookies if not found in header
    if (!token && req.cookies?.userToken) {
      token = req.cookies.userToken;
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // ✅ Find user
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    } 

    // ✅ Attach to request
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      message: "Unauthorized! Invalid or expired token.",
    });
  }
};

module.exports = { userAuthMiddlware };


