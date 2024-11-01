import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="pt-20 px-4">
      <h1 className="text-3xl text-center font-bold mb-10">Admin dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-10">
        <Link to="/admin/users" className="dashboard-card">
          <div className="flex items-center justify-center bg-red-500 text-white text-2xl p-6 rounded-lg h-40 w-full">
            <p className="text-center">Manage Users</p>
          </div>
        </Link>
        <Link to="/admin/bookings" className="dashboard-card">
          <div className="flex items-center justify-center bg-red-500 text-white text-2xl p-6 rounded-lg h-40 w-full">
            <p className="text-center">Manage Bookings</p>
          </div>
        </Link>
        <Link to="/admin/sessions" className="dashboard-card">
          <div className="flex items-center justify-center bg-red-500 text-white text-2xl p-6 rounded-lg h-40 w-full">
            <p className="text-center">Manage Sessions</p>
          </div>
        </Link>
        <Link to="/admin/karts" className="dashboard-card">
          <div className="flex items-center justify-center bg-red-500 text-white text-2xl p-6 rounded-lg h-40 w-full">
            <p className="text-center">Manage Karts</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
