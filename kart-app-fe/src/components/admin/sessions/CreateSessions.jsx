import React, { useState } from "react";
import ToastNotification from "../../notifications/ToastNotification";

export default function CreateSessions() {
  const [days, setDays] = useState([]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [interval, setInterval] = useState("");

  const dayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayChange = (day) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const formatTime = (time) => {
    return time ? `${time}:00` : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (days.length === 0) {
      ToastNotification("error", "Please select at least one day.");
      return;
    }
    if (!openingTime || !closingTime || !interval) {
      ToastNotification("error", "Please fill in all fields.");
      return;
    }

    const formattedOpeningTime = formatTime(openingTime);
    const formattedClosingTime = formatTime(closingTime);

    const data = {
      openDays: days,
      openingTime: formattedOpeningTime,
      closingTime: formattedClosingTime,
      intervalInMinutes: parseInt(interval, 10),
    };

    try {
      const response = await fetch(
        "https://localhost:7197/api/Session/generate",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to create sessions");

      ToastNotification("success", "Sessions created successfully.");
      setDays([]);
      setOpeningTime("");
      setClosingTime("");
      setInterval("");
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 pt-20">
      <h1 className="text-3xl text-center font-bold mb-10">Create Sessions</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Select Days:</label>
          <div className="grid grid-cols-3 gap-2">
            {dayOptions.map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={day}
                  checked={days.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="form-checkbox"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="openingTime" className="block mb-2 font-semibold">
            Opening Time:
          </label>
          <input
            type="time"
            id="openingTime"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="closingTime" className="block mb-2 font-semibold">
            Closing Time:
          </label>
          <input
            type="time"
            id="closingTime"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="interval" className="block mb-2 font-semibold">
            Session Length (minutes):
          </label>
          <input
            type="number"
            id="interval"
            min="1"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Create Sessions
        </button>
      </form>
    </div>
  );
}
