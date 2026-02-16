import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const Donations = () => {
  const { aToken } = useContext(AdminContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // 
        // "http://localhost:8989/api/admin/donations"
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/donations`, {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed");

        setDonations(json.data);
      } catch (err) {
        console.error("Failed to fetch donations", err);
      }
    };

    if (aToken) fetchDonations();
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Donations</h1>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Phone</th>
              {/* <th className="px-4 py-2 text-left">Date</th> */}
            </tr>
          </thead>
          <tbody>
            {donations.map((d, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{d.fullName}</td>
                <td className="px-4 py-2">{d.donationType}</td>
                <td className="px-4 py-2">{d.phone}</td>
                {/* <td className="px-4 py-2">
                  {new Date(d.date).toLocaleDateString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Donations;
