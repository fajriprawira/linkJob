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
      <nav className="navbar bg-blue-800 p-4 rounded-lg shadow-lg">
        <div className="flex-1 flex items-center space-x-4">
          {/* Logo */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {/* Optional: Add your logo here */}
            <span className="text-blue-800 font-bold">LJ</span>
          </div>
          {/* Title */}
          <a className="text-xl text-white font-mono">LINKJOB</a>
        </div>
        <div className="flex-none space-x-4">
          <button
            onClick={logout}
            className="btn btn-ghost text-white font-bold"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
