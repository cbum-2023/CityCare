import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ArrowRight,
  FileText,
  CheckCircle,
  Eye,
  Construction,
  Lightbulb,
  Trash2,
  MapPin,
  Star,
  Droplets,
  Shield,
  Users,
  TrendingUp,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user) {
    // redirect to the same profile route used elsewhere (Navbar uses "/profile")
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Info Bar */}
      <div className="bg-slate-800 text-gray-300 py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              1800-XXX-XXXX
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              support@nagarikawaz.gov.in
            </span>
          </div>
          <span className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Mon-Sat: 9:00 AM - 6:00 PM
          </span>
        </div>
      </div>

      {/* Header Navigation removed — using global Navbar component */}

      {/* Hero Section */}
      <section
        id="home"
        className="relative px-4 py-24 md:py-32"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(30, 58, 138, 0.85)),
            url('https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=2070&auto=format&fit=crop')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              Government of India Initiative
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Citizens,<br />Building Better Cities
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              A transparent platform for reporting and tracking civic issues across India. 
              Your voice matters in building the nation we envision.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md transition inline-flex items-center gap-2 shadow-lg"
              >
                Report an Issue
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-md transition border-2 border-white">
                View Live Issues
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Issues Reported</span>
                  <span className="font-bold text-2xl text-blue-600">12,547</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Issues Resolved</span>
                  <span className="font-bold text-2xl text-green-600">9,832</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Active Users</span>
                  <span className="font-bold text-2xl text-orange-600">45,231</span>
                </div>
              </div>
              <div className="pt-3 border-t">
                <div className="text-sm text-gray-600 mb-2">Resolution Rate</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{width: '78%'}}></div>
                </div>
                <div className="text-right text-sm font-semibold text-gray-700 mt-1">78%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">500+</div>
              <div className="text-sm text-gray-600">Municipalities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">28</div>
              <div className="text-sm text-gray-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">50K+</div>
              <div className="text-sm text-gray-600">Active Citizens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">80%</div>
              <div className="text-sm text-gray-600">Resolution Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section id="issues" className="px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Report Civic Issues
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select from various categories of civic problems. Every report is tracked 
              and forwarded to relevant authorities for swift action.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Construction,
                title: "Roads & Infrastructure",
                desc: "Potholes, broken roads, footpaths",
                color: "blue",
                issues: 3247
              },
              {
                icon: Lightbulb,
                title: "Street Lighting",
                desc: "Non-functional lights, dark areas",
                color: "yellow",
                issues: 1823
              },
              {
                icon: Trash2,
                title: "Waste Management",
                desc: "Garbage overflow, illegal dumping",
                color: "green",
                issues: 2156
              },
              {
                icon: Droplets,
                title: "Water & Drainage",
                desc: "Leaks, blockages, water supply",
                color: "cyan",
                issues: 1891
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className={`bg-${item.color}-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
                <div className="text-xs text-gray-500 font-medium">
                  {item.issues.toLocaleString()} issues reported
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-gray-600 text-lg">
              Transparent, trackable, and efficient civic issue management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gray-300"></div>
            
            {[
              {
                icon: FileText,
                step: "01",
                title: "Submit Report",
                content:
                  "Upload photos, add precise location, and describe the issue with relevant details. All submissions are time-stamped and geo-tagged.",
              },
              {
                icon: Eye,
                step: "02",
                title: "Verification & Review",
                content: "Community members and moderators verify the report. Authorities are notified based on issue severity and category.",
              },
              {
                icon: CheckCircle,
                step: "03",
                title: "Track & Resolve",
                content: "Monitor real-time updates on your issue. Get notifications when work begins and when it's marked as resolved.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="absolute -top-4 left-8 bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-sm shadow-md">
                  Step {item.step}
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mt-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why CityCare?
            </h2>
            <p className="text-gray-600 text-lg">
              Built with transparency, security, and citizen empowerment at its core
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Verified",
                desc: "All reports are verified and your data is protected with government-grade security protocols."
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Powered by active citizens who care about their neighborhoods and municipal development."
              },
              {
                icon: TrendingUp,
                title: "Measurable Impact",
                desc: "Track resolution rates, response times, and see the real difference your reports make."
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be the Change Your City Needs
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of responsible citizens making India's cities cleaner, safer, and better for everyone.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-md text-lg transition inline-flex items-center gap-2 shadow-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">CityCare</h3>
                  <p className="text-xs text-gray-400">Citizen Voice Platform</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Empowering citizens to report and resolve civic issues across India.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#issues" className="hover:text-white transition">Report Issue</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>1800-XXX-XXXX (Toll Free)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>support@nagarikawaz.gov.in</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Ministry of Urban Affairs<br/>New Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © 2024 CityCare. A Government of India Initiative.
            </p>
            <p className="text-gray-500">
              Developed by <span className="text-white font-semibold">Shivam Sharma</span>, IIIT Ranchi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;