import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Clock,
  Settings,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Loader,
  BarChart3,
} from "lucide-react";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  const getResolutionRate = () => {
    if (!stats || stats.total === 0) return 0;
    return Math.round((stats.resolved / stats.total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Administrator Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Municipal Issue Management & Analytics
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-purple-100" />
                  <span className="text-purple-100 text-sm font-medium">
                    Administrative Access
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to CityCare Control Panel
                </h2>
                <p className="text-purple-100">
                  Monitor, manage, and resolve civic issues reported by citizens across your municipality
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
              >
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                      TOTAL
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">
                      {stats.total.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 font-semibold text-sm mb-2">
                      Total Reports
                    </p>
                    <p className="text-xs text-gray-500">
                      All issues submitted to date
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 px-6 py-3 border-t border-blue-100">
                  <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                    <Activity className="w-3 h-3" />
                    <span>System-wide submissions</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-red-600" />
                    </div>
                    <div className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      URGENT
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-red-600 mb-1">
                      {stats.pending.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 font-semibold text-sm mb-2">
                      Pending Review
                    </p>
                    <p className="text-xs text-gray-500">
                      Awaiting administrative action
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 px-6 py-3 border-t border-red-100">
                  <div className="flex items-center gap-2 text-xs text-red-700 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Requires immediate attention</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                      <Settings className="w-7 h-7 text-yellow-600" />
                    </div>
                    <div className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
                      ACTIVE
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-yellow-600 mb-1">
                      {stats.inProgress.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 font-semibold text-sm mb-2">
                      In Progress
                    </p>
                    <p className="text-xs text-gray-500">
                      Currently being addressed
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 px-6 py-3 border-t border-yellow-100">
                  <div className="flex items-center gap-2 text-xs text-yellow-700 font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>Work in progress</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      DONE
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-green-600 mb-1">
                      {stats.resolved.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 font-semibold text-sm mb-2">
                      Resolved
                    </p>
                    <p className="text-xs text-gray-500">
                      Successfully completed
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 px-6 py-3 border-t border-green-100">
                  <div className="flex items-center gap-2 text-xs text-green-700 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Issues resolved</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics
                  </h3>
                  <p className="text-blue-100 text-sm">Key operational indicators</p>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Resolution Rate</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {getResolutionRate()}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${getResolutionRate()}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {stats.resolved} of {stats.total} issues resolved
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Active Issues</span>
                      <span className="font-bold text-gray-900 text-lg">
                        {stats.pending + stats.inProgress}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Pending Actions</span>
                      <span className="font-bold text-red-600 text-lg">
                        {stats.pending}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Completion Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all duration-300"
                            style={{ width: `${getResolutionRate()}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {getResolutionRate()}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Health
                  </h3>
                  <p className="text-green-100 text-sm">Real-time status monitoring</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">Platform Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-bold text-sm">ONLINE</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium">Database</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 font-bold text-sm">CONNECTED</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-gray-700 font-medium">Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 font-bold text-sm">SECURED</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Last Updated</span>
                      <span className="text-gray-900 font-semibold text-sm">
                        {new Date().toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-900 mb-2">
                    Administrative Priority
                  </h3>
                  <p className="text-orange-800 mb-4">
                    {stats.pending > 0 ? (
                      <>
                        You have <strong>{stats.pending}</strong> pending issue{stats.pending !== 1 ? 's' : ''} requiring immediate review. 
                        Navigate to "All Reports" to prioritize and assign these issues to appropriate departments.
                      </>
                    ) : (
                      <>
                        All reports are being actively managed. Great job maintaining system efficiency!
                      </>
                    )}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="/all-reports"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                    >
                      View All Reports
                    </a>
                    <a
                      href="/admin/update-status"
                      className="bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-600 font-semibold py-2 px-6 rounded-lg transition-all duration-200 text-sm"
                    >
                      Update Status
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-16 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Unable to Load Statistics
            </h3>
            <p className="text-gray-600 mb-6">
              There was an error fetching dashboard data. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Refresh Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;