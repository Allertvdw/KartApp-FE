import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route
          path="/booking/confirmation/:bookingId"
          element={<BookingConfirmation />}
        />
        <Route path="/users" element={<UserOverview />} />
      </Routes>
      <Footer />
      <ToastContainer stacked position="top-center" />
    </>
  );
}
