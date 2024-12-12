import { useState, useEffect } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SessionDetails() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessionDetails();
  }, [sessionId]);

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString();
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchSessionDetails = async () => {
    try {
      const response = await fetch(
        `https://localhost:7197/api/Session/details?sessionId=${sessionId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch session details.");
      }

      const data = await response.json();
      setSessionDetails(data);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-10">
      <h1 className="text-3xl text-center font-bold mb-6">Session Details</h1>
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold">
          Date:{" "}
          {sessionDetails.length > 0 &&
            formatDate(sessionDetails[0].sessionDate)}
        </p>
        <p className="text-lg font-semibold">
          Time:{" "}
          {sessionDetails.length > 0 &&
            formatTime(sessionDetails[0].sessionStartTime)}{" "}
          -{" "}
          {sessionDetails.length > 0 &&
            formatTime(sessionDetails[0].sessionEndTime)}
        </p>
      </div>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Kart Number</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Booking ID</th>
          </tr>
        </thead>
        <tbody>
          {sessionDetails.length > 0 ? (
            sessionDetails.map((details) => (
              <tr key={details.kartNumber} className="hover:bg-gray-50">
                <td className="p-2 border-b">{details.kartNumber}</td>
                <td className="p-2 border-b">
                  {details.firstName} {details.lastName}
                </td>
                <td className="p-2 border-b">{details.bookingId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No customers found for this session.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
