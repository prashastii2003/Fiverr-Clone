import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          <div>
            <h2 className="font-bold text-gray-900 mb-3">Categories</h2>
            <ul className="space-y-2 text-sm">
              <li>Graphics & Design</li>
              <li>Digital Marketing</li>
              <li>Writing & Translation</li>
              <li>Video & Animation</li>
              <li>Music & Audio</li>
              <li>Programming & Tech</li>
              <li>Data</li>
              <li>Business</li>
              <li>Lifestyle</li>
              <li>Photography</li>
              <li>End-to-End Projects</li>
              <li>Sitemap</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 mb-3">About</h2>
            <ul className="space-y-2 text-sm">
              <li>Careers</li>
              <li>Press & News</li>
              <li>Partnerships</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Intellectual Property Claims</li>
              <li>Investor Relations</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 mb-3">Support</h2>
            <ul className="space-y-2 text-sm">
              <li>Help & Support</li>
              <li>Trust & Safety</li>
              <li>Selling on Worksphere</li>
              <li>Buying on Worksphere</li>
              <li>Worksphere Guides</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 mb-3">Community</h2>
            <ul className="space-y-2 text-sm">
              <li>Customer Success Stories</li>
              <li>Community Hub</li>
              <li>Forum</li>
              <li>Events</li>
              <li>Blog</li>
              <li>Influencers</li>
              <li>Affiliates</li>
              <li>Podcast</li>
              <li>Invite a Friend</li>
              <li>Become a Seller</li>
              <li>Community Standards</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 mb-3">More From Worksphere</h2>
            <ul className="space-y-2 text-sm">
              <li>Worksphere Enterprise</li>
              <li>Worksphere Business</li>
              <li>WorkspherePro</li>
              <li>Worksphere Logo Maker</li>
              <li>Get Inspired</li>
              <li>Worksphere Select</li>
              <li>ClearVoice - Content Marketing</li>
              <li>Worksphere Workspace - Invoice Software</li>
              <li>Learn - Online Courses</li>
              <li>Working Not Working</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-gray-900">Worksphere</h2>
            <span className="text-sm text-gray-500">
              © Worksphere International Ltd. 2025
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://twitter.com/fiverr">
                <img src="/images/twitter.png" alt="Twitter" className="w-5 h-5 hover:opacity-80 transition" />
              </a>
              <a href="https://www.facebook.com/Fiverr/">
                <img src="/images/facebook.png" alt="Facebook" className="w-5 h-5 hover:opacity-80 transition" />
              </a>
              <a href="https://www.linkedin.com/company/fiverr-com">
                <img src="/images/linkedin.png" alt="LinkedIn" className="w-5 h-5 hover:opacity-80 transition" />
              </a>
              <a href="https://www.pinterest.com/fiverr/">
                <img src="/images/pinterest.png" alt="Pinterest" className="w-5 h-5 hover:opacity-80 transition" />
              </a>
              <a href="https://www.instagram.com/fiverr/">
                <img src="/images/instagram.png" alt="Instagram" className="w-5 h-5 hover:opacity-80 transition" />
              </a>
            </div>

            {/* Language / Currency / Accessibility */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
                <img src="/images/language.png" alt="Language" className="w-5 h-5" />
                <span className="text-sm">English</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
                <img src="/images/coin.png" alt="Currency" className="w-5 h-5" />
                <span className="text-sm">USD</span>
              </div>
              <img src="/images/accessibility.png" alt="Accessibility" className="w-5 h-5 cursor-pointer hover:opacity-80 transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
