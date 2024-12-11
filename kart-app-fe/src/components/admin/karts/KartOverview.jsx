import { useEffect, useState } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { useNavigate } from "react-router-dom";

export default function KartOverview() {
  const [karts, setKarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKarts();
  }, []);

  const getKartStatus = (kartStatus) => {
    switch (kartStatus) {
      case 0:
        return "Available";
      case 1:
        return "Under Maintenance";
      case 2:
        return "Broken";
      default:
        return "Unknown";
    }
  };

  const handleUpdateKartClick = (kartId) => {
    navigate(`/admin/karts/update/${kartId}`);
  };

  const handleAddKartClick = () => {
    navigate("/admin/karts/add");
  };

  const fetchKarts = async () => {
    try {
      const response = await fetch("https://localhost:7197/api/Kart");

      if (!response.ok) {
        throw new Error("Failed to fetch karts.");
      }

      const data = await response.json();
      setKarts(data);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  const deleteKart = async (kartId) => {
    try {
      const response = await fetch(
        `https://localhost:7197/api/Kart/${kartId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete kart.");
      }

      ToastNotification("success", "Kart deleted successfully.");
      // Update the list by filtering out the deleted kart
      setKarts((prevKarts) => prevKarts.filter((kart) => kart.id !== kartId));
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-10">
      <h1 className="text-3xl text-center font-bold mb-6">Kart Overview</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleAddKartClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add Kart
        </button>
      </div>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Id</th>
            <th className="p-2 border-b">Number</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {karts.length > 0 ? (
            karts.map((kart) => (
              <tr key={kart.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{kart.id}</td>
                <td className="p-2 border-b">{kart.number}</td>
                <td className="p-2 border-b">{getKartStatus(kart.status)}</td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => handleUpdateKartClick(kart.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteKart(kart.id)}
                    className="mx-5 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No karts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
