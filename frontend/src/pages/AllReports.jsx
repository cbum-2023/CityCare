import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  FileText,
  Search,
  Filter,
  MapPin,
  Building,
  Tag,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Image as ImageIcon,
  Loader,
  Shield,
} from "lucide-react";

const AllReports = () => {
  const { user, token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [filterArea, setFilterArea] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
        params: filterArea ? { area: filterArea } : {},
      });

      console.log("Admin fetched reports:", res.data.reports);
      setReports(Array.isArray(res.data.reports) ? res.data.reports : []);
    } catch (err) {
      console.error("Admin report fetch error", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchReports();
    }
  }, [filterArea, token, user]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "resolved":
        return {
          icon: CheckCircle,
          color: "green",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          badgeBg: "bg-green-100",
          label: "Resolved",
        };
      case "in-progress":
        return {
          icon: Clock,
          color: "yellow",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          badgeBg: "bg-yellow-100",
          label: "In Progress",
        };
      default:
        return {
          icon: AlertCircle,
          color: "red",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          badgeBg: "bg-red-100",
          label: "Pending",
        };
    }
  };

  const getCategoryEmoji = (category) => {
    const categoryMap = {
      roads: "🛣️",
      sanitation: "🗑️",
      streetlights: "💡",
      water: "💧",
      parks: "🌳",
      noise: "🔊",
      utilities: "⚡",
      safety: "🚨",
      other: "📋",
    };
    return categoryMap[category?.toLowerCase()] || "📋";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Reports</h1>
              <p className="text-gray-600 text-sm">
                Complete overview of citizen-reported issues
              </p>
            </div>
          </div>

          {/* Admin Badge */}
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 inline-flex">
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">
              Administrator View
            </span>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Options
            </h2>
            <p className="text-blue-100 text-sm">Narrow down results by location</p>
          </div>
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Area
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter area name to filter (e.g., Gomti Nagar, MG Road)..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value.toLowerCase())}
              />
            </div>
            {filterArea && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filter:</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {filterArea}
                </span>
                <button
                  onClick={() => setFilterArea("")}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reports Section */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-16 text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium text-lg">Loading reports...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Reports Found</h3>
            <p className="text-gray-600 mb-1">
              {filterArea
                ? `No reports found in "${filterArea}"`
                : "No reports have been submitted yet"}
            </p>
            <p className="text-gray-500 text-sm">
              {filterArea && "Try adjusting your filter criteria"}
            </p>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {reports.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Reports</div>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {reports.filter((r) => r.status === "pending").length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {reports.filter((r) => r.status === "resolved").length}
                    </div>
                    <div className="text-sm text-gray-600">Resolved</div>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-6">
              {reports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={report._id}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Report Image */}
                        {report.imageUrl ? (
                          <div className="flex-shrink-0">
                            <img
                              src={report.imageUrl}
                              alt="Report evidence"
                              className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-40 h-40 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                          </div>
                        )}

                        {/* Report Details */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-gray-100 text-gray-600 text-xs font-mono px-3 py-1 rounded">
                                  ID: {report._id.slice(0, 12)}...
                                </span>
                                <div
                                  className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${statusConfig.borderColor} ${statusConfig.bgColor}`}
                                >
                                  <StatusIcon className={`w-4 h-4 ${statusConfig.textColor}`} />
                                  <span className={`font-semibold text-xs ${statusConfig.textColor}`}>
                                    {statusConfig.label}
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <span className="text-2xl">{getCategoryEmoji(report.category)}</span>
                                {report.title}
                              </h3>
                              <p className="text-gray-700 leading-relaxed">
                                {report.description}
                              </p>
                            </div>
                          </div>

                          {/* Metadata Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Tag className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Category</div>
                                <div className="font-semibold text-gray-900 capitalize">
                                  {report.category || "N/A"}
                                </div>
                              </div>
                            </div>

                            {report.state && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <MapPin className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">State</div>
                                  <div className="font-semibold text-gray-900 capitalize">
                                    {report.state}
                                  </div>
                                </div>
                              </div>
                            )}

                            {report.area && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Building className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Area</div>
                                  <div className="font-semibold text-gray-900 capitalize">
                                    {report.area}
                                  </div>
                                </div>
                              </div>
                            )}

                            {report.createdAt && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Calendar className="w-4 h-4 text-orange-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Submitted</div>
                                  <div className="font-semibold text-gray-900">
                                    {formatDate(report.createdAt)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Report ID: <code className="bg-gray-200 px-2 py-1 rounded font-mono">{report._id}</code>
                        </span>
                        <a
                          href="/admin/update-status"
                          className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition"
                        >
                          Update Status →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results Footer */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600">
                Showing <strong>{reports.length}</strong> report{reports.length !== 1 ? "s" : ""}
                {filterArea && (
                  <>
                    {" "}
                    in <strong>"{filterArea}"</strong>
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllReports;