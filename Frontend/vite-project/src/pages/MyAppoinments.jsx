import React, { useEffect, useState } from "react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login`
      // "http://localhost:8989/api/user/appointment"
      const response = await fetch( `${import.meta.env.VITE_BACKEND_URL}/api/user/appointment`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
    
      const data = await response.json();
      console.log("Appointments:", data);

      if (response.ok && data.appointments) {
        setAppointments(data.appointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div
              key={app._id}
              className="border p-4 rounded-lg flex items-center gap-4 bg-white shadow"
            >
              {/* Doctor Image */}
              <img
                src={app.doctorId
?.image || "https://placehold.co/100x100?text=Doctor"}
                className="w-20 h-20 rounded-full object-cover"
                alt="Doctor"
              />

              <div className="flex-1">
                {/* Doctor Name */}
                <h3 className="text-xl font-semibold">
                  Dr.{" "}
                  {app.doctorId
?.firstName && app.doctorId
?.lastName
                    ? `${app.doctorId
.firstName} ${app.doctorId
.lastName}`
                    : "Unknown Doctor"}
                </h3>

                {/* Speciality */}
                <p className="text-gray-600">
                  {app.doctorId
?.speciality || "Speciality N/A"}
                </p>

                {/* Slot Date */}
                <p className="text-gray-600 text-sm mt-1">
                  Date: <b>{app.appointmentDate || "N/A"}</b>
                </p>

                {/* Slot Time */}
                <p className="text-gray-600 text-sm">
                  Time: <b>{app.appointmentTime || "N/A"}</b>
                </p>

                {/* Status */}
                <p
                  className={`mt-2 text-sm font-semibold ${
                    app.cancelled ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {app.cancelled ? "Cancelled" : "Active"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
