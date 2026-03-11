import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-700 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg">CityCare</p>
                <p className="text-xs text-slate-400">Citizen Voice Platform</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering citizens to report and resolve civic issues across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/report" className="text-sm text-slate-400 hover:text-white transition-colors">Report Issue</Link></li>
              <li><Link to="/my-reports" className="text-sm text-slate-400 hover:text-white transition-colors">My Reports</Link></li>
              <li><Link to="/profile" className="text-sm text-slate-400 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone size={15} className="text-blue-400 shrink-0" />
                1800-XXX-XXXX (Toll Free)
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={15} className="text-blue-400 shrink-0" />
                support@citycare.gov.in
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5" />
                Ministry of Urban Affairs, New Delhi, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-500">© 2024 CityCare. A Government of India Initiative.</p>
          <p className="text-xs text-slate-600">Developed for public service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
