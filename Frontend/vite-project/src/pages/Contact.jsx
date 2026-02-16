import React, { useState } from "react";

function Contact() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);

  const [input, setInput] = useState("");

  const options = [
    "Book an Appointment",
    "Emergency Help",
    "Doctor Information",
    "Billing / Refund Support",
    "Technical Issue",
    "Other"
  ];

  const sendMessage = (msg) => {
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it! Please fill the form below and we will contact you shortly." }
      ]);
    }, 500);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     name: e.target.name.value,
  //     phone: e.target.phone.value,
  //     issueType: e.target.issueType.value,
  //     message: e.target.message.value,
  //   };

  //   try {
  //     const res = await fetch("http://localhost:8989/api/contact", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await res.json();
  //     alert(result.message || "Message Sent!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error sending message!");
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    phone: e.target.phone.value,
    issueType: e.target.issueType.value,
    message: e.target.message.value,
  };

  try {
    // "http://localhost:8989/api/contact"
    // 
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  ;


    const result = await res.json();
    alert(result.message || "Message Sent!");

    // 🔥 Clear all form fields
    e.target.reset();

  } catch (error) {
    console.error(error);
    alert("Error sending message!");
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-700">
        Contact Support
      </h2>

      {/* Chatbot Box */}
      <div className="border rounded-xl p-5 bg-white shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-3">Smart Assistant</h3>

        <div className="h-64 overflow-y-auto border p-3 rounded-lg bg-gray-50">
          {messages.map((m, index) => (
            <p
              key={index}
              className={`p-2 my-1 rounded-lg max-w-[80%] ${
                m.sender === "bot"
                  ? "bg-teal-100 text-gray-800"
                  : "bg-teal-600 text-white ml-auto"
              }`}
            >
              {m.text}
            </p>
          ))}
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {options.map((o, i) => (
            <button
              key={i}
              onClick={() => sendMessage(o)}
              className="px-3 py-1 text-sm bg-teal-600 text-white rounded-full hover:bg-teal-700"
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-2xl font-semibold mb-4 text-teal-700">
          Send Us a Message
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="border p-3 rounded-lg"
          />
        </div>

        <select
          name="issueType"
          className="border p-3 rounded-lg w-full mt-4"
          required
        >
          <option value="">Select Issue Type</option>
          {options.map((o, i) => (
            <option key={i}>{o}</option>
          ))}
        </select>

        <textarea
          name="message"
          className="border p-3 rounded-lg w-full mt-4"
          rows="4"
          placeholder="Write your message..."
          required
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 text-lg font-semibold"
        >
          Submit
        </button>
      </form>

      {/* Contact Info Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-3">Hospital Support</h3>
        
        <p className="text-gray-700">
          📞 Phone: <b>+91-98765-43210</b>
        </p>
        <p className="text-gray-700 mb-3">
          📧 Email: <b>support@smartcare.com</b>
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">

          <div className="border p-4 rounded-lg text-center bg-gray-50">
            <h4 className="font-bold">Emergency</h4>
            <p className="text-red-600 font-semibold">+91-99999-11111</p>
          </div>

          <div className="border p-4 rounded-lg text-center bg-gray-50">
            <h4 className="font-bold">Appointments</h4>
            <p className="text-green-600 font-semibold">+91-88888-22222</p>
          </div>

          <div className="border p-4 rounded-lg text-center bg-gray-50">
            <h4 className="font-bold">Admin Office</h4>
            <p className="text-blue-600 font-semibold">+91-77777-33333</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
