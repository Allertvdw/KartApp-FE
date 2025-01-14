import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-red-500">About Us</h1>
          <p className="text-lg mb-8">
            Welcome to Karting! We're passionate about delivering
            adrenaline-pumping racing experiences that bring people together.
            Whether you're a thrill-seeker, a family looking for a fun day out,
            or planning a corporate event, Karting is the place to be.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-black text-center">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Karting began with a mission: to create a safe, exciting, and
            inclusive environment for people of all ages to enjoy the thrill of
            racing. Over the years, we've evolved into a premier karting
            destination, offering state-of-the-art facilities, top-quality
            karts, and a community of racers who share our love for speed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Innovation
              </h3>
              <p className="text-gray-700">
                We continuously upgrade our karts and track to provide a
                cutting-edge racing experience.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Safety</h3>
              <p className="text-gray-700">
                Safety is our top priority. Our track and equipment meet the
                highest standards.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Community
              </h3>
              <p className="text-gray-700">
                Join a growing community of racers who share your passion for
                speed and competition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
