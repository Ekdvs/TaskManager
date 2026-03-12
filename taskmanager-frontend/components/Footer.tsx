"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111118] text-white/70 py-6 border-t border-white/[0.07] mt-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: App Info */}
        <div className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}