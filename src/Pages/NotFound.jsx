 import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-extrabold text-blue-700 tracking-widest">404</h1>
      <div className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
        Page Not Found
      </div>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the home page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
