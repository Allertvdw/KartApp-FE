import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../notifications/ToastNotification";
import { useAuth } from "../auth/AuthService";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();
    await loginRequest();
  };

  const loginRequest = async () => {
    try {
      const response = await fetch("https://localhost:7197/api/User/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 401) {
        ToastNotification("error", "Incorrect email or password.");
        return;
      }

      const data = await response.json();
      login(data.token);

      const decodedToken = jwtDecode(data.token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      if (role === "Admin") {
        ToastNotification("success", "Login successful.");
        navigate("/admin");
      } else {
        ToastNotification("success", "Login successful.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      ToastNotification("error", "An error occurred during login.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSumbit}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <div className="inputs space-y-4">
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
        </div>
        <button className="w-full bg-red-500 text-white p-3 rounded-lg mt-6 hover:bg-red-600">
          Login
        </button>
      </form>
    </div>
  );
}
