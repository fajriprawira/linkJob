import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-purple-500 text-white py-3 px-5 flex justify-between items-center rounded-lg shadow-lg">
        {/* Logo or Home Link */}
        <div className="text-xl font-bold">
          <Link
            to="/"
            className="hover:text-gray-300 transition"
          >
            LINK JOB
          </Link>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link
            to="/myjobs"
            className="bg-white text-purple-500 px-3 py-1 rounded-full hover:bg-purple-700 hover:text-white transition"
          >
            MyJobs
          </Link>
        </div>

        {/* Logout Button */}
        <div className="flex items-center">
          <p>{localStorage.username}</p>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full font-bold hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
