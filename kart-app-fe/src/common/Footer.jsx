import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Introduction */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">About Us</h3>
            <p>
              Karting is the ultimate destination for adrenaline-filled karting
              experiences. Whether you're racing with friends or hosting an
              event, our state-of-the-art karts and tracks will guarantee an
              unforgettable time.
            </p>
          </div>

          {/* Opening Times */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">
              Opening Times
            </h3>
            <ul>
              <li>Monday - Friday: 10:00 AM - 10:00 PM</li>
              <li>Saturday: 9:00 AM - 11:00 PM</li>
              <li>Sunday: 10:00 AM - 9:00 PM</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Contact Us</h3>
            <p>
              <strong>Address:</strong> 123 Speed Track Avenue, Kart City, KC
              4567
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p>
              <strong>Email:</strong> info@kartingfun.com
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-gray-400">
          <p>&copy; 2024 Karting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
