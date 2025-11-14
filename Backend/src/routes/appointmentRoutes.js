const express = require('express');
const router = express.Router();
// Correct path to your Appointment model
const Appointment = require('../../models/appointment'); 
// Assuming your model file is named 'appointment.js'

// POST route to handle new appointment booking
// Full Endpoint: /api/appointments/book 
router.post('/book', async (req, res) => {
    // Destructure all expected fields from the request body
      console.log("📩 Incoming appointment data:", req.body);
    const { doctorId, patientName, patientPhone, appointmentDate, appointmentTime } = req.body; 

    try {
        // 1. Basic Validation: Check if all ABSOLUTELY required fields are present
        if (!doctorId || !patientName || !patientPhone || !appointmentDate || !appointmentTime) {
            // Using a return ensures the function stops here
            return res.status(400).json({ message: 'Missing one or more required appointment fields.' });
        }
        
        // 2. Date Validation & Conversion: Ensure the date string is valid
        const dateObject = new Date(appointmentDate);
        if (isNaN(dateObject)) {
            // Check if the conversion resulted in an "Invalid Date"
            return res.status(400).json({ message: 'Invalid appointment date format provided.' });
        }

        // 3. Create the new appointment document
        const newAppointment = new Appointment({
            doctorId,
            patientName,
            patientPhone,
            appointmentDate: dateObject, // Use the validated Date object
            appointmentTime,
            status: 'Pending',
        });

        // 4. Save to MongoDB
        await newAppointment.save();
        
        // 5. Send SUCCESS JSON Response (Status 201 Created)
        return res.status(201).json({ 
            message: 'Appointment booked successfully!', 
            appointment: newAppointment // Return the saved object for client confirmation
        });

    } catch (error) {
        // 6. Send ERROR JSON Response (Status 500 Server Error)
        console.error('Mongoose/Server Save Error:', error);
        return res.status(500).json({ 
            message: 'Failed to save appointment due to a server error.', 
            details: error.message 
        });
    }
});

// 🚨 IMPORTANT EXPORT FIX 🚨
// This file uses the default export (module.exports = router;).
// If your server.js uses the named import: 
// `const { appointmentRouter } = require('./routes/appointmentRoutes');`
// Then you MUST change this export to match:
module.exports = { appointmentRouter: router };