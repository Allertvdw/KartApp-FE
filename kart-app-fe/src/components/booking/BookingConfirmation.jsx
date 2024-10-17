import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(
        `https://localhost:7197/api/Booking/${bookingId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch booking details.");
      }
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      ToastNotification("error", error.message);
    }
  };

  if (!booking) {
    return <p>Booking details not found.</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mt-20 text-center">
        Thank you! We will see you on track soon.
      </h1>
      <div className="max-w-md mx-auto p-4 pt-4">
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Booking Details</h2>
          <div className="mb-4">
            <p className="font-semibold">Booking ID:</p>
            <p>{booking.id}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Date:</p>
            <p>{new Date(booking.date).toLocaleDateString()}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Time:</p>
            <p>
              {new Date(booking.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(booking.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Number of People:</p>
            <p>{booking.peopleCount}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Created At:</p>
            <p>{new Date(booking.createdAt).toLocaleString()}</p>
          </div>
          <p className="font-bold">
            Please arrive atleast 20 minutes before the start of your session
            and keep your booking ID ready. This will be used to verify your
            booking and for registration.
          </p>
        </div>
      </div>
    </>
  );
}
