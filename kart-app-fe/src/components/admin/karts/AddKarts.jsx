import React, { useState } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

export default function AddKarts() {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const mapStatus = {
    0: "Available",
    1: "Under Maintenance",
    2: "Broken",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/Kart`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          number: number,
          status: status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          ToastNotification("error", errorMessages.join("\n"));
          console.log(errorMessages);
        }
        return;
      }

      ToastNotification("success", "Kart added successfully.");
      navigate("/admin/karts");
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 pt-10">
      <h1 className="text-3xl text-center font-bold mb-10">Add Kart</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="number" className="block mb-2 font-semibold">
            Number:
          </label>
          <input
            type="number"
            id="number"
            min="1"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="status" className="block mb-2 font-semibold">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value, 10))}
            required
            className="border p-2 w-full"
          >
            <option value="" disabled>
              Select status
            </option>
            {Object.entries(mapStatus).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Add Kart
        </button>
      </form>
    </div>
  );
}
