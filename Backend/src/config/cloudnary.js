const cloudinary = require('cloudinary').v2;

const connectCloudinary = async () => {
  // Support both correct spellings and the existing typos in .env
  const cloudName = process.env.CLOUDINARY_NAME || process.env.CLOUDNIARY_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.CLOUDNIARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDNIARY_SECRET_KEY;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn("⚠️ Cloudinary credentials not fully configured, image uploads may not work");
    return;
  }

  cloudinary.config({
    cloud_name: cloudName.trim().replace(/^["']|["']$/g, ''),
    api_key: apiKey.trim().replace(/^["']|["']$/g, ''),
    api_secret: apiSecret.trim().replace(/^["']|["']$/g, ''),
  });
  console.log("✅ Cloudinary Configured Successfully");
};

module.exports = { connectCloudinary };