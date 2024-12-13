import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-red-500">
            Welcome to Karting!
          </h1>
          <p className="text-lg mb-8">
            Experience the thrill of karting at our state-of-the-art track.
            Perfect for friends, family, and corporate events!
          </p>
          <Link
            to="/booking"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg text-lg"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Why Karting?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Karting offers an exciting karting experience on one of the best
            tracks in the country. Whether you're a beginner or a seasoned
            racer, you'll enjoy our high-performance karts and challenging
            circuits. Come and race your friends to see who’s the fastest!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Top-Quality Karts
              </h3>
              <p className="text-gray-700">
                Our karts are built for speed and safety, providing you with the
                ultimate racing experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Challenging Tracks
              </h3>
              <p className="text-gray-700">
                Our track features tight turns and long straights that will test
                your driving skills.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Fun for All Ages
              </h3>
              <p className="text-gray-700">
                Whether you're young or young at heart, karting is a great way
                to have fun and compete with friends.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
