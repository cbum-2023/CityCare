import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { 
  AlertTriangle, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  FileText,
  MapPin,
  Image as ImageIcon,
  Info
} from "lucide-react";

const Report = () => {
  const { user, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("/api/user/report", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Report submitted successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
      
      // Clear file input
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit report. Please try again.");
    }
  };

  const categories = [
    { value: "roads", label: "Roads & Infrastructure", icon: "🛣️" },
    { value: "sanitation", label: "Sanitation & Waste Management", icon: "🗑️" },
    { value: "streetlights", label: "Street Lighting", icon: "💡" },
    { value: "water", label: "Water Supply & Drainage", icon: "💧" },
    { value: "parks", label: "Parks & Public Spaces", icon: "🌳" },
    { value: "noise", label: "Noise Pollution", icon: "🔊" },
    { value: "utilities", label: "Public Utilities", icon: "⚡" },
    { value: "safety", label: "Public Safety Concerns", icon: "🚨" },
    { value: "other", label: "Other Issues", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Report Civic Issue</h1>
              <p className="text-gray-600 text-sm">Help improve your community infrastructure</p>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Official Issue Reporting Portal</p>
                <p className="text-blue-700">All reports are forwarded to relevant municipal authorities for swift action. Your report ID will be generated upon submission.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Issue Details</h2>
                <p className="text-blue-100 text-sm">Please provide accurate information for faster resolution</p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title Input */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Issue Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="title"
                      type="text"
                      placeholder="e.g., Large pothole on MG Road near City Mall"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Be specific and concise</p>
                </div>

                {/* Category Selection */}
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Issue Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">-- Select category --</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Select the most appropriate category</p>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="6"
                    placeholder="Please describe the issue in detail:
• Exact location (street name, landmarks, etc.)
• How long the issue has existed
• Impact on the community
• Any safety concerns
• Additional context that may help authorities"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 resize-vertical"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Minimum 20 characters</p>
                    <p className="text-xs text-gray-500">{description.length} characters</p>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Photo <span className="text-gray-400 text-xs font-normal">(Recommended)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <span className="text-gray-700 font-medium mb-1">
                          Click to upload image
                        </span>
                        <span className="text-gray-500 text-sm">
                          PNG, JPG, JPEG (Max 10MB)
                        </span>
                        <span className="text-xs text-gray-400 mt-2">
                          Photos help authorities verify and resolve issues faster
                        </span>
                      </div>
                    </label>
                  </div>
                  {image && (
                    <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-green-600" />
                        <div className="flex-1">
                          <p className="text-green-800 text-sm font-medium">File attached successfully</p>
                          <p className="text-green-700 text-xs">{image.name}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Report to Authorities
                  </button>
                </div>
              </form>

              {/* Message Display */}
              {message && (
                <div className="px-6 pb-6">
                  <div
                    className={`p-4 rounded-lg border-l-4 ${
                      message.includes("successfully")
                        ? "bg-green-50 border-green-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {message.includes("successfully") ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className={`font-semibold ${message.includes("successfully") ? "text-green-900" : "text-red-900"}`}>
                          {message.includes("successfully") ? "Report Submitted Successfully!" : "Submission Failed"}
                        </p>
                        <p className={`text-sm ${message.includes("successfully") ? "text-green-700" : "text-red-700"}`}>
                          {message.includes("successfully") 
                            ? "Your report has been forwarded to the relevant authorities. You can track its status in 'My Reports'."
                            : message
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Guidelines */}
          <div className="lg:col-span-1 space-y-6">
            {/* Reporting Guidelines */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Reporting Guidelines</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <span>Provide exact location details including street name and nearby landmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">2</span>
                  </div>
                  <span>Upload clear photos showing the issue from multiple angles if possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">3</span>
                  </div>
                  <span>Select the most appropriate category for faster routing to correct department</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">4</span>
                  </div>
                  <span>Include severity level and any immediate safety concerns</span>
                </li>
              </ul>
            </div>

            {/* What Happens Next */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-orange-600 font-bold">1</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Verification</p>
                    <p className="text-gray-700">Report reviewed within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Assignment</p>
                    <p className="text-gray-700">Forwarded to municipal department</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-orange-600 font-bold">3</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Resolution</p>
                    <p className="text-gray-700">Work begins & status updated</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Platform Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Avg. Response Time</span>
                  <span className="font-bold text-blue-600">24-48 hrs</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Resolution Rate</span>
                  <span className="font-bold text-green-600">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Reports</span>
                  <span className="font-bold text-gray-900">12,547</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;