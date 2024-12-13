import { useState, useEffect } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

export default function SessionOverview() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
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

  const handleCreateSessionClick = () => {
    navigate("/admin/sessions/create");
  };

  const handleSessionDetailsClick = (sessionId) => {
    navigate(`/admin/sessions/details/${sessionId}`);
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Session`);

      if (!response.ok) {
        throw new Error("Failed to fetch sessions.");
      }

      const data = await response.json();
      setSessions(data);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-10">
      <h1 className="text-3xl text-center font-bold mb-6">Session Overview</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleCreateSessionClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Create Session
        </button>
      </div>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Id</th>
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Time</th>
            <th className="p-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{session.id}</td>
                <td className="p-2 border-b">
                  {formatDate(session.startTime)}
                </td>
                <td className="p-2 border-b">
                  {formatTime(session.startTime)} -{" "}
                  {formatTime(session.endTime)}
                </td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => handleSessionDetailsClick(session.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No sessions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
