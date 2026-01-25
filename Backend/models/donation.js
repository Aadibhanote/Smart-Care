const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },

    donationType: {
      type: String,
      enum: ["blood", "organ", "tissue", "bone"],
      required: true,
    },

    bloodGroup: String,
    organType: String,
    medicalHistory: String,

    address: { type: String, required: true },
    emergencyContact: { type: String, required: true },

    consent: { type: Boolean, required: true },

    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
