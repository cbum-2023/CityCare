import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Tag,
  Image as ImageIcon,
  TrendingUp,
  Loader,
  PlusCircle,
  Calendar,
  Building,
} from "lucide-react";

const MyReports = () => {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/user/my-reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched reports:", res.data.reports);
        setReports(Array.isArray(res.data.reports) ? res.data.reports : []);
      } catch (err) {
        console.error("Error fetching reports", err);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchReports();
    }
  }, [token]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "resolved":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          iconColor: "text-green-600",
          badgeBg: "bg-green-100",
          label: "Resolved",
        };
      case "in-progress":
        return {
          icon: Clock,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          iconColor: "text-yellow-600",
          badgeBg: "bg-yellow-100",
          label: "In Progress",
        };
      default:
        return {
          icon: AlertCircle,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          iconColor: "text-blue-600",
          badgeBg: "bg-blue-100",
          label: "Under Review",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
              <p className="text-gray-600 text-sm">Track and manage your civic issue submissions</p>
            </div>
          </div>
        </div>

        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {reports.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Total Reports</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {reports.filter((r) => r.status === "resolved").length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Resolved</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {reports.filter((r) => r.status === "in-progress").length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">In Progress</div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {reports.filter((r) => r.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Under Review</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Your Submissions</h2>
              <p className="text-blue-100 text-sm">All civic issues reported by you</p>
            </div>
            <a
              href="/report"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              New Report
            </a>
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="text-gray-600 font-medium text-lg">Loading your reports...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your submissions</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Reports Submitted Yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't submitted any civic issues yet. Start making a difference by reporting problems in your community.
              </p>
              <a
                href="/report"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <PlusCircle className="w-5 h-5" />
                Submit Your First Report
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={report._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex gap-6">
                      
                      {report.imageUrl ? (
                        <div className="flex-shrink-0">
                          <img
                            src={report.imageUrl}
                            alt="Report evidence"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                              <span className="text-2xl">{getCategoryEmoji(report.category)}</span>
                              {report.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {report.description}
                            </p>
                          </div>
                          <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${statusConfig.borderColor} ${statusConfig.bgColor} flex-shrink-0`}
                          >
                            <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
                            <span className={`font-semibold text-sm ${statusConfig.textColor}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Tag className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Category</div>
                              <div className="font-semibold text-gray-900 capitalize">
                                {report.category || "Uncategorized"}
                              </div>
                            </div>
                          </div>

                          {report.state && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
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
                            <div className="flex items-center gap-2 text-sm text-gray-600">
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
                            <div className="flex items-center gap-2 text-sm text-gray-600">
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

                        {report._id && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="font-semibold">Report ID:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                                {report._id.slice(0, 12)}...
                              </code>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {reports.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Track Your Impact</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Your reports help municipal authorities prioritize and resolve civic issues. 
                  Reports typically move from "Under Review" → "In Progress" → "Resolved" within 7-14 days 
                  depending on the severity and complexity of the issue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;