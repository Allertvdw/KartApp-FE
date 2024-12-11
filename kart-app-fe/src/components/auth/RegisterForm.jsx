import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    await registerRequest();
  };

  const registerRequest = async () => {
    try {
      const response = await fetch("https://localhost:7197/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          ToastNotification("error", errorMessages.join("\n"));
          console.log(errorMessages);
        }
        return;
      }

      ToastNotification("success", "Registration successful.");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration: ", error);
      ToastNotification("error", "An error occurred during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSumbit}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <div className="inputs space-y-4">
          <div className="firstName">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="name"
              placeholder="First name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="lastName">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="name"
              placeholder="Last name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="password">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="phoneNumber">
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="phone"
              placeholder="Phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <button className="w-full bg-red-500 text-white p-3 rounded-lg mt-6 hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
}
