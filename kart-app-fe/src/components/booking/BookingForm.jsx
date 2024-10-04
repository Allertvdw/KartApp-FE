import { useState } from "react";
import { timeslots } from "../../assets/timeslots";

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [timeslot, setTimeslot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      date,
      peopleCount,
      timeslot,
    });
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
        <div>
          <label htmlFor="timeSlot" className="block mb-2">
            Time slot:
          </label>
          <select
            id="timeSlot"
            value={timeslot}
            onChange={(e) => setTimeslot(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {timeslots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
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
