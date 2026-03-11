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
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-700 rounded-lg shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <Link to="/" className="text-xl font-bold text-slate-800 hover:text-blue-700 transition-colors duration-200">
              CityCare
            </Link>
            <p className="text-xs text-slate-400 hidden sm:block">Municipal Services</p>
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center space-x-2">
          {user && (
            <div className="hidden md:flex items-center space-x-1 mr-4">
              {user?.role === "user" && (
                <>
                  <Link to="/report" className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                    <FilePlus size={17} /><span>Report Issue</span>
                  </Link>
                  <Link to="/my-reports" className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                    <LayoutDashboard size={17} /><span>My Reports</span>
                  </Link>
                  <Link to="/profile" className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                    <User size={17} /><span>Profile</span>
                  </Link>
                </>
              )}
              {user?.role === "admin" && (
                <>
                  <Link to="/admin-dashboard" className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                    <LayoutDashboard size={17} /><span>Dashboard</span>
                  </Link>
                  <Link to="/all-reports" className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                    <ListOrdered size={17} /><span>All Reports</span>
                  </Link>
                  <Link to="/admin/update-status" className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                    <ClipboardEdit size={17} /><span>Update Status</span>
                  </Link>
                </>
              )}
            </div>
          )}

          {user && (
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-3 py-1.5 mr-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-slate-600 capitalize">
                {user.role === "admin" ? "Admin" : "Citizen"}
              </span>
            </div>
          )}

          {!user ? (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-slate-600 hover:text-blue-700 font-medium transition-colors duration-200 text-sm">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm text-sm">
                Sign Up
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium text-sm">
              <LogOut size={17} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
