// const mongoose =  require("mongoose")
// require('dotenv').config();

// const ConnectMongoDB = () => {
//     return mongoose.connect(`${process.env.MONGO_URI}` )
// };

// module.exports = {ConnectMongoDB}
// src/config/database.js

// src/config/database.js (FINAL CORRECTED CODE)

// const mongoose =  require("mongoose")
// require('dotenv').config();

// const ConnectMongoDB = () => {
//     // Remove the deprecated 'tlsAllowInsecure' option. 
//     // Keep 'serverSelectionTimeoutMS' for stability, and remove other deprecated options.
//     return mongoose.connect(process.env.MONGO_URI, { 
//         serverSelectionTimeoutMS: 5000, 
//         // Note: The options useNewUrlParser, useUnifiedTopology, etc., are also removed 
//         // because they are the default behavior in Mongoose 6+
//     });
// };

// module.exports = {ConnectMongoDB}
// src/config/database.js

// *****************NEW************
const mongoose = require("mongoose");

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully to smartcare database");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = { ConnectMongoDB };
