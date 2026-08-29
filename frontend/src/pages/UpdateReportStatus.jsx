import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Shield,
  FileText,
  Info,
} from "lucide-react";

const UpdateReportStatus = () => {
  const { token } = useContext(AuthContext);
  const [reportId, setReportId] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.put(
        `/api/admin/report/${reportId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Status updated successfully");
      setReportId("");
      setStatus("pending");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating status. Please verify the Report ID and try again.");
    }
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Pending Review",
      icon: AlertCircle,
      color: "red",
      emoji: "🔴",
      description: "Issue awaiting administrative review",
    },
    {
      value: "in-progress",
      label: "In Progress",
      icon: Clock,
      color: "yellow",
      emoji: "🟡",
      description: "Work has begun on this issue",
    },
    {
      value: "resolved",
      label: "Resolved",
      icon: CheckCircle,
      color: "green",
      emoji: "🟢",
      description: "Issue has been successfully resolved",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
              <Edit className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Update Report Status
              </h1>
              <p className="text-gray-600 text-sm">
                Administrative control panel for issue management
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Administrator Access Required</p>
                <p className="text-blue-700">
                  This panel allows authorized personnel to update the status of citizen-reported issues. 
                  All changes are logged and tracked for accountability.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Status Update Form
                </h2>
                <p className="text-purple-100 text-sm">Update issue resolution status</p>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Report ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={reportId}
                      onChange={(e) => setReportId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Enter Report ID (e.g., 507f1f77bcf86cd799439011)"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    You can find the Report ID in the "All Reports" section
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    New Status <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {statusOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            status === option.value
                              ? `border-${option.color}-500 bg-${option.color}-50`
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={status === option.value}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                          />
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            status === option.value
                              ? `bg-${option.color}-100`
                              : "bg-gray-100"
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              status === option.value
                                ? `text-${option.color}-600`
                                : "text-gray-400"
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 flex items-center gap-2">
                              <span>{option.emoji}</span>
                              {option.label}
                            </div>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!reportId.trim()}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Update Report Status
                  </button>
                  {!reportId.trim() && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Please enter a Report ID to continue
                    </p>
                  )}
                </div>
              </form>
            </div>

            {message && (
              <div className="mt-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-green-900 mb-1">
                      Status Updated Successfully
                    </h4>
                    <p className="text-sm text-green-700">{message}</p>
                    <p className="text-xs text-green-600 mt-2">
                      Citizens will be notified of this status change.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-red-900 mb-1">
                      Update Failed
                    </h4>
                    <p className="text-sm text-red-700">{error}</p>
                    <p className="text-xs text-red-600 mt-2">
                      Please verify the Report ID and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                Status Reference Guide
              </h3>
              <div className="space-y-4">
                {statusOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <div
                      key={option.value}
                      className={`p-4 rounded-lg border-l-4 bg-${option.color}-50 border-${option.color}-500`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 bg-${option.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-4 h-4 text-${option.color}-600`} />
                        </div>
                        <div>
                          <div className={`font-bold text-${option.color}-900 text-sm mb-1 flex items-center gap-1`}>
                            <span>{option.emoji}</span>
                            {option.label}
                          </div>
                          <p className={`text-xs text-${option.color}-700 leading-relaxed`}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Best Practices</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-700 text-xs font-bold">1</span>
                  </div>
                  <span>Review the report details before updating status</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-700 text-xs font-bold">2</span>
                  </div>
                  <span>Update status as work progresses to keep citizens informed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-700 text-xs font-bold">3</span>
                  </div>
                  <span>Mark as "Resolved" only when issue is completely fixed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-700 text-xs font-bold">4</span>
                  </div>
                  <span>All status changes are logged for accountability</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/all-reports"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm text-center"
                >
                  View All Reports
                </a>
                <a
                  href="/admin-dashboard"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm text-center"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReportStatus;
