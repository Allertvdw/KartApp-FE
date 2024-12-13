import { useState, useEffect } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

export default function BookingOverview() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString();
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Booking`);

      if (!response.ok) {
        throw new Error("Failed to fetch bookings.");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-10">
      <h1 className="text-3xl text-center font-bold mb-10">Booking Overview</h1>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Id</th>
            <th className="p-2 border-b">Session Date</th>
            <th className="p-2 border-b">Session Time</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Phone Numuber</th>
            <th className="p-2 border-b">People Count</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{booking.id}</td>
                <td className="p-2 border-b">
                  {formatDate(booking.session.startTime)}
                </td>
                <td className="p-2 border-b">
                  {formatTime(booking.session.startTime)} -{" "}
                  {formatTime(booking.session.endTime)}
                </td>
                <td className="p-2 border-b">{booking.email}</td>
                <td className="p-2 border-b">{booking.phoneNumber}</td>
                <td className="p-2 border-b">{booking.peopleCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
