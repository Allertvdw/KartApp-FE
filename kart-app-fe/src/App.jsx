import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./components/home/Home";
import BookingForm from "./components/booking/BookingForm";
import BookingConfirmation from "./components/booking/BookingConfirmation";
import UserOverview from "./components/admin/users/UserOverview";
import Dashboard from "./components/admin/Dashboard";

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route
          path="/booking/confirmation/:bookingId"
          element={<BookingConfirmation />}
        />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserOverview />} />
      </Routes>

      {!isAdminPage && <Footer />}
      <ToastContainer stacked position="top-center" />
    </>
  );
}
