"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi"; // Logout icon
import { HiCheck } from "react-icons/hi";   // Task icon

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.sub || "");
      }
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserEmail(""); // Clear state
    router.push("/login");
  };

  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "U";

  return (
    <nav className="bg-[#111118] border-b border-white/[0.07] sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white">
            <HiCheck size={20} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">TaskFlow</span>
        </div>

        {/* Right: User info / Login / Register */}
        <div className="flex items-center gap-4">
          {userEmail ? (
            <>
              {/* Logged in: show initials + email */}
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-400 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {initials}
                </div>
                <span className="text-white/70 text-sm max-w-[180px] truncate">{userEmail}</span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-white/70 hover:text-white border border-white/[0.07] hover:border-white/20 bg-transparent hover:bg-white/5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <FiLogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <>
              {/* Not logged in: show login & register */}
              <button
                onClick={() => router.push("/login")}
                className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors duration-200"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}