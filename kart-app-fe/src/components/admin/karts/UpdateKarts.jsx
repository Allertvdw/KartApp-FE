import React, { useEffect, useState } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UpdateKarts() {
  const { kartId } = useParams();
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchKartDetails();
  }, [kartId]);

  const mapStatus = {
    0: "Available",
    1: "Under Maintenance",
    2: "Broken",
  };

  const fetchKartDetails = async () => {
    try {
      const response = await fetch(`https://localhost:7197/api/Kart/${kartId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch kart details.");
      }

      const data = await response.json();
      setNumber(data.number);
      setStatus(data.status);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://localhost:7197/api/Kart/${kartId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: kartId,
            number: number,
            status: status,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update kart");

      ToastNotification("success", "Kart updated successfully.");
      navigate(`/admin/karts/update/${kartId}`);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 pt-10">
      <h1 className="text-3xl text-center font-bold mb-10">Update Kart</h1>
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
          Update Kart
        </button>
      </form>
    </div>
  );
}
