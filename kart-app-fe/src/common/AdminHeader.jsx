import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthService";
import ToastNotification from "../components/notifications/ToastNotification";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    ToastNotification("success", "Logout successful.");
    navigate("/");
  };

  return (
    <header className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50 border-b-4 border-red-500">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/admin" className="text-red-500">
            Karting
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/admin/users" className="hover:text-red-500">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/bookings" className="hover:text-red-500">
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/admin/sessions" className="hover:text-red-500">
              Sessions
            </Link>
          </li>
          <li>
            <Link to="/admin/karts" className="hover:text-red-500">
              Karts
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-6">
          <li>
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
