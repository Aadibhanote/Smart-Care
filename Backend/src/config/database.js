const mongoose = require("mongoose");

const ConnectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("Neither MONGO_URL nor MONGO_URI is defined in environment variables");
    }

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected Successfully to smartcare database");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    // Don't crash immediately in serverless environments, but log clearly
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

module.exports = { ConnectMongoDB };
