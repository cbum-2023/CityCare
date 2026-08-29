import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Shield, Lock, User, AlertCircle } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user", 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      
      const res = await axios.post("/api/auth/login", form);
      const token = res.data.token;

      login(token); 

      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role === "admin") {
        navigate("/all-reports");
      } else {
        navigate("/my-reports");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      
      <div className="bg-slate-800 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Government of India Initiative</span>
          </div>
          <div className="text-xs text-gray-300">Secure Login Portal</div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          
          <div className="hidden md:block space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-9 h-9 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CityCare</h1>
                <p className="text-gray-600">Citizen Voice Platform</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Secure Access Portal
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Access your civic dashboard to report and track local infrastructure 
                issues. A transparent platform serving millions of citizens across India.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Authentication</h3>
                  <p className="text-sm text-gray-600">Your data is protected with government-grade security</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Role-Based Access</h3>
                  <p className="text-sm text-gray-600">Citizens and municipal admins have dedicated dashboards</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Privacy Protected</h3>
                  <p className="text-sm text-gray-600">Your personal information remains confidential</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Ministry of Urban Affairs, Government of India<br/>
                Supporting Smart Cities Mission & Swachh Bharat Abhiyan
              </p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                <h2 className="text-2xl font-bold mb-1">Sign In</h2>
                <p className="text-blue-100 text-sm">Access your civic dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Access Level
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
                    required
                  >
                    <option value="user">Citizen User</option>
                    <option value="admin">Municipal Administrator</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500">
                    Select your role to access the appropriate dashboard
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                >
                  Sign In to Dashboard
                </button>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Register Now
                    </button>
                  </p>
                </div>
              </form>

              <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Secure encrypted connection</span>
                </div>
              </div>
            </div>

            <div className="md:hidden mt-8 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <h1 className="text-lg font-bold text-gray-900">CityCare</h1>
                  <p className="text-xs text-gray-600">Citizen Voice Platform</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 px-4">
                A Government of India Initiative
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
