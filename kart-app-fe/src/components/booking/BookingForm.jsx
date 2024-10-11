import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedSession, setSelectedSession] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      fetchAvailableSessions(date);
    }
  }, [date]);

  const fetchAvailableSessions = async () => {
    const response = await fetch(
      `https://localhost:7197/api/Session?date=${date}`
    );
    const data = await response.json();
    setSessions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSession) {
      ToastNotification("error", "Please select a timeslot.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://localhost:7197/api/Booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: selectedSession,
          peopleCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book session");
      }

      ToastNotification("success", "Session booked successfully.");
    } catch (error) {
      ToastNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">Book a Karting Session</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="selectedSession" className="block mb-2">
            Session:
          </label>
          <select
            id="selectedSession"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {sessions.map((timeslot) => (
              <option key={timeslot.id} value={timeslot.id}>
                {new Date(timeslot.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(timeslot.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="peopleCount" className="block mb-2">
            Number of people:
          </label>
          <input
            type="number"
            id="peopleCount"
            min="1"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
