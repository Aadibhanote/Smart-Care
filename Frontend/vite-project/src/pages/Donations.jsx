import React, { useState, useEffect } from "react";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("all");

  const donationTypes = [
    { id: "all", name: "All Types", icon: "🔍", color: "gray" },
    { id: "blood", name: "Blood", icon: "🩸", color: "red" },
    { id: "organ", name: "Organ", icon: "❤️", color: "pink" },
    { id: "tissue", name: "Tissue", icon: "🦴", color: "blue" },
    { id: "bone", name: "Bone Marrow", icon: "💉", color: "purple" },
  ];

  const bloodGroups = [
    "all",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  // Fetch donations from API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userToken");
        const response = await fetch(
          // http://localhost:8989/api/user/donations
        "http://localhost:8989/api/user/donations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.donations) {
          setDonations(data.donations);
          setFilteredDonations(data.donations);
        } else if (response.ok && Array.isArray(data)) {
          // Handle case where API returns array directly
          setDonations(data);
          setFilteredDonations(data);
        } else {
          // If API doesn't exist yet, use mock data for UI demonstration
          setDonations([]);
          setFilteredDonations([]);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        // Set empty array on error
        setDonations([]);
        setFilteredDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Filter donations based on search and filters
  useEffect(() => {
    let filtered = [...donations];

    // Filter by donation type
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (donation) => donation.donationType === selectedType
      );
    }

    // Filter by blood group (for blood donations)
    if (selectedBloodGroup !== "all" && selectedType === "blood") {
      filtered = filtered.filter(
        (donation) => donation.bloodGroup === selectedBloodGroup
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (donation) =>
          donation.fullName?.toLowerCase().includes(searchLower) ||
          donation.organType?.toLowerCase().includes(searchLower) ||
          donation.address?.toLowerCase().includes(searchLower) ||
          donation.bloodGroup?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredDonations(filtered);
  }, [searchTerm, selectedType, selectedBloodGroup, donations]);

  const getDonationTypeInfo = (type) => {
    return (
      donationTypes.find((t) => t.id === type) || {
        name: type,
        icon: "💝",
        color: "gray",
      }
    );
  };

  const getColorClasses = (color) => {
    const colorMap = {
      red: "bg-red-600",
      pink: "bg-pink-600",
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      gray: "bg-gray-600",
    };
    return colorMap[color] || "bg-gray-600";
  };

  const getGradientClasses = (color) => {
    const gradientMap = {
      red: "bg-gradient-to-r from-red-500 to-red-600",
      pink: "bg-gradient-to-r from-pink-500 to-pink-600",
      blue: "bg-gradient-to-r from-blue-500 to-blue-600",
      purple: "bg-gradient-to-r from-purple-500 to-purple-600",
      gray: "bg-gradient-to-r from-gray-500 to-gray-600",
    };
    return gradientMap[color] || "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Available Donations
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
            Find available donors and connect with those who are ready to give
            the gift of life
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Search Donations
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location, blood group, or organ type..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Filter Row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Donation Type Filter */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Donation Type
              </label>
              <div className="flex flex-wrap gap-2">
                {donationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedType === type.id
                        ? `${getColorClasses(type.color)} text-white shadow-md`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Blood Group Filter (only for blood donations) */}
            {selectedType === "blood" && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Blood Group
                </label>
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group === "all" ? "All Blood Groups" : group}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            <span className="font-semibold">
              {filteredDonations.length} donation
              {filteredDonations.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">Loading donations...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredDonations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Donations Found
            </h3>
            <p className="text-gray-600 mb-6">
              {donations.length === 0
                ? "There are no available donations at the moment. Check back later!"
                : "Try adjusting your search or filter criteria."}
            </p>
            {(selectedType !== "all" ||
              selectedBloodGroup !== "all" ||
              searchTerm !== "") && (
              <button
                onClick={() => {
                  setSelectedType("all");
                  setSelectedBloodGroup("all");
                  setSearchTerm("");
                }}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Donations Grid */}
        {!loading && filteredDonations.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => {
              const typeInfo = getDonationTypeInfo(donation.donationType);
              return (
                <div
                  key={donation._id || donation.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-teal-500"
                >
                  {/* Card Header */}
                  <div
                    className={`${getGradientClasses(typeInfo.color)} text-white p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{typeInfo.icon}</span>
                        <span className="font-bold text-lg">
                          {typeInfo.name}
                        </span>
                      </div>
                      {donation.donationType === "blood" &&
                        donation.bloodGroup && (
                          <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-sm">
                            {donation.bloodGroup}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Donor Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {donation.fullName || "Anonymous Donor"}
                    </h3>

                    {/* Organ Type (for organ donations) */}
                    {donation.donationType === "organ" &&
                      donation.organType && (
                        <div className="mb-3">
                          <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {donation.organType}
                          </span>
                        </div>
                      )}

                    {/* Details */}
                    <div className="space-y-2 text-gray-600 mb-4">
                      {donation.age && (
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          <span>Age: {donation.age} years</span>
                        </div>
                      )}

                      {donation.address && (
                        <div className="flex items-start gap-2">
                          <span>📍</span>
                          <span className="text-sm">{donation.address}</span>
                        </div>
                      )}

                      {donation.phone && (
                        <div className="flex items-center gap-2">
                          <span>📞</span>
                          <span className="text-sm">{donation.phone}</span>
                        </div>
                      )}

                      {donation.email && (
                        <div className="flex items-center gap-2">
                          <span>📧</span>
                          <span className="text-sm truncate">
                            {donation.email}
                          </span>
                        </div>
                      )}

                      {/* {donation.registeredAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>📅</span>
                          <span>Registered: {formatDate(donation.registeredAt)}</span>
                        </div>
                      )} */}
                      {donation.createdAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>📅</span>
                        <span>Registered: {formatDate(donation.createdAt)}</span>
                        
                        </div>
                        )}

                    </div>

                    {/* Medical History (if available) */}
                    {donation.medicalHistory && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">
                          Medical History:
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {donation.medicalHistory}
                        </p>
                      </div>
                    )}

                    {/* Emergency Contact */}
                    {donation.emergencyContact && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">
                          Emergency Contact:
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {donation.emergencyContact}
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-6">
                      <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Contact Donor
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-3">
            ℹ️ Important Information
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>
              • All donors have voluntarily registered and provided consent
            </li>
            <li>
              • Medical screening will be conducted before any donation
            </li>
            <li>
              • Please contact donors respectfully and only for genuine needs
            </li>
            <li>
              • For organ donations, family consent is required at the time of
              donation
            </li>
            <li>
              • If you need immediate assistance, contact our donation hotline:
              +91-99999-44444
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Donations;
