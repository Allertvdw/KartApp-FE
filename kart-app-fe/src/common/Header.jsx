import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50 border-b-4 border-red-500">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-red-500">
            Karting
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/booking" className="hover:text-red-500">
              Booking
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="hover:text-red-500">
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500">
              Contact
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-6">
          <li>
            <Link to="/login" className="hover:text-red-500">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-red-500">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
