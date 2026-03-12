"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from "react-icons/fa";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await loginUser({ email, password });

      const token = res?.data?.token || res?.token;

      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);

      toast.success("Login successful");

      router.push("/tasks");

    } catch (err: any) {

      toast.error(err?.response?.data?.message || "Login failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white flex-col justify-center px-16">

        <h1 className="text-4xl font-bold mb-6">
          TaskFlow Manager
        </h1>

        <p className="text-indigo-100 mb-8 text-lg">
          Manage your tasks efficiently and stay organized with our smart task management system.
        </p>

        <div className="space-y-4">

          <Feature text="Role-based access control" />
          <Feature text="Task priority tracking" />
          <Feature text="Deadline management" />
          <Feature text="Secure JWT authentication" />

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex flex-1 items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Sign in
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}

            <div className="relative">

              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* PASSWORD */}

            <div className="relative">

              <FaLock className="absolute left-3 top-3 text-gray-400" />

              <input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <FaCheckCircle />
      <span>{text}</span>
    </div>
  );
}