import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    await registerRequest();
  };

  const registerRequest = async () => {
    try {
      const response = await fetch("https://localhost:7197/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
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
          <div className="email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="password">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-6 hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
}
