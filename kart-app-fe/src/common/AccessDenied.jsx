export default function AccessDenied() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
      <p className="text-lg mt-4">
        You do not have permission to view this page.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Return to Home
      </a>
    </div>
  );
}
