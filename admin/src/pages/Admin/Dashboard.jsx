import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext"; // adjust path if needed


const Dashboard = () => {
    const { aToken } = useContext(AdminContext);
 const [stats, setStats] = useState({
  doctors: 0,
  users: 0,
  appointments: 0,
  donations: 0,
  latestAppointments: [],
  latestDonations: [],
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:8989/api/admin/", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch stats");
      }

      const json = await res.json();
      setStats(json.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  fetchStats();
}, []);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.users} color="bg-blue-500" />
        <StatCard title="Doctors" value={stats.doctors} color="bg-green-500" />
        <StatCard title="Appointments" value={stats.appointments} color="bg-yellow-500" />
        <StatCard title="Donations" value={stats.donations} color="bg-red-500" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-xl shadow-lg`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
