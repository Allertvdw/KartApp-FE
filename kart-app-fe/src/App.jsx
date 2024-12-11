import { Routes, Route, useLocation } from "react-router-dom";
import { AuthService } from "./components/auth/AuthService";
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
import CreateSessions from "./components/admin/sessions/CreateSessions";
import SessionOverview from "./components/admin/sessions/SessionOverview";
import BookingOverview from "./components/admin/bookings/BookingOverview";
import KartOverview from "./components/admin/karts/KartOverview";
import AddKarts from "./components/admin/karts/AddKarts";
import UpdateKarts from "./components/admin/karts/UpdateKarts";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AccessDenied from "./common/AccessDenied";
import AdminHeader from "./common/AdminHeader";

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <AuthService>
        <Routes>
          {/* Public Pages */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <div className="my-10"></div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/booking" element={<BookingForm />} />
                  <Route
                    path="/booking/confirmation/:bookingId"
                    element={<BookingConfirmation />}
                  />
                </Routes>
                <Footer />
              </>
            }
          />

          {/* Admin Pages */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="Admin">
                <>
                  <AdminHeader />
                  <div className="my-20"></div>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="users" element={<UserOverview />} />
                    <Route path="bookings" element={<BookingOverview />} />
                    <Route path="sessions" element={<SessionOverview />} />
                    <Route
                      path="sessions/create"
                      element={<CreateSessions />}
                    />
                    <Route path="karts" element={<KartOverview />} />
                    <Route path="karts/add" element={<AddKarts />} />
                    <Route
                      path="karts/update/:kartId"
                      element={<UpdateKarts />}
                    />
                  </Routes>
                </>
              </ProtectedRoute>
            }
          />

          {/* Access Denied Route */}
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>

        <ToastContainer stacked position="top-center" />
      </AuthService>
    </>
  );
}
