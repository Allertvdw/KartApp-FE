import { useEffect, useState } from "react";
import ToastNotification from "../../notifications/ToastNotification";
import { API_BASE_URL } from "../../../config";

export default function UserOverview() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/User`);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-10">
      <h1 className="text-3xl text-center font-bold mb-10">User Overview</h1>
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">First Name</th>
            <th className="p-2 border-b">Last Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Phone Number</th>
            <th className="p-2 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{user.firstName}</td>
                <td className="p-2 border-b">{user.lastName}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.phoneNumber}</td>
                <td className="p-2 border-b">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
