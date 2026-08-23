// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Shield, User, Mail, Lock, MapPin, AlertCircle } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    state: "",
    area: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/auth/signup", form);
      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header Bar */}
      <div className="bg-slate-800 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Government of India Initiative</span>
          </div>
          <div className="text-xs text-gray-300">Citizen Registration Portal</div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Branding & Info */}
          <div className="hidden md:block space-y-6 sticky top-8">
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
                Register as a Citizen
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Join millions of citizens across India in making our cities better. 
                Report civic issues, track their resolution, and contribute to nation building.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4">Benefits of Registration</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Report and track civic issues in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Get updates on issue resolution status</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Connect with your local community</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Secure and confidential data protection</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Government Verified</h3>
                  <p className="text-sm text-gray-600">Official platform under Ministry of Urban Affairs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Registration</h3>
                  <p className="text-sm text-gray-600">Your personal data is encrypted and protected</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Ministry of Urban Affairs, Government of India<br/>
                Supporting Smart Cities Mission & Digital India
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                <h2 className="text-2xl font-bold mb-1">Create Account</h2>
                <p className="text-blue-100 text-sm">Register to start reporting civic issues</p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Minimum 6 characters recommended</p>
                </div>

                {/* Role Field */}
                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
                    required
                  >
                    <option value="user">Citizen (Report Issues)</option>
                    <option value="admin">Municipal Administrator</option>
                  </select>
                </div>

                {/* State Field */}
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white appearance-none"
                      required
                    >
                      <option value="">Select your state</option>
                      <option value="andhra pradesh">Andhra Pradesh</option>
                      <option value="arunachal pradesh">Arunachal Pradesh</option>
                      <option value="assam">Assam</option>
                      <option value="bihar">Bihar</option>
                      <option value="chhattisgarh">Chhattisgarh</option>
                      <option value="goa">Goa</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="haryana">Haryana</option>
                      <option value="himachal pradesh">Himachal Pradesh</option>
                      <option value="jharkhand">Jharkhand</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="kerala">Kerala</option>
                      <option value="madhya pradesh">Madhya Pradesh</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="manipur">Manipur</option>
                      <option value="meghalaya">Meghalaya</option>
                      <option value="mizoram">Mizoram</option>
                      <option value="nagaland">Nagaland</option>
                      <option value="odisha">Odisha</option>
                      <option value="punjab">Punjab</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="sikkim">Sikkim</option>
                      <option value="tamil nadu">Tamil Nadu</option>
                      <option value="telangana">Telangana</option>
                      <option value="tripura">Tripura</option>
                      <option value="uttar pradesh">Uttar Pradesh</option>
                      <option value="uttarakhand">Uttarakhand</option>
                      <option value="west bengal">West Bengal</option>
                    </select>
                  </div>
                </div>

                {/* Area Field */}
                <div>
                  <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
                    Area/District <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    id="area"
                    type="text"
                    name="area"
                    placeholder="e.g., Lucknow, Gomti Nagar"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg mt-6"
                >
                  Register Account
                </button>

                {/* Login Link */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>

              {/* Form Footer */}
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By registering, you agree to contribute to making your community better and follow our community guidelines.
                </p>
              </div>
            </div>

            {/* Mobile Branding */}
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

export default Signup;
