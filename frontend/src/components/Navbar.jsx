import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LogOut,
  User,
  FilePlus,
  LayoutDashboard,
  ClipboardEdit,
  ListOrdered,
  Shield,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center shadow-sm">
            <Shield className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CityCare</h1>
            <p className="text-xs text-gray-600">Citizen Voice Platform</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden md:flex items-center gap-1 mr-4">
              
              {user?.role === "user" && (
                <>
                  <Link
                    to="/report"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm"
                  >
                    <FilePlus size={18} />
                    <span>Report Issue</span>
                  </Link>

                  <Link
                    to="/my-reports"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm"
                  >
                    <LayoutDashboard size={18} />
                    <span>My Reports</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                </>
              )}

              {user?.role === "admin" && (
                <>
                  <Link
                    to="/admin-dashboard"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/all-reports"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm"
                  >
                    <ListOrdered size={18} />
                    <span>All Reports</span>
                  </Link>

                  <Link
                    to="/admin/update-status"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm"
                  >
                    <ClipboardEdit size={18} />
                    <span>Update Status</span>
                  </Link>
                </>
              )}
            </div>
          )}

          {user && (
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1.5 mr-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700 capitalize">
                {user.role === "admin" ? "Admin" : "Citizen"}
              </span>
            </div>
          )}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 shadow-sm text-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200 flex items-center gap-2 font-medium text-sm"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>

        <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
