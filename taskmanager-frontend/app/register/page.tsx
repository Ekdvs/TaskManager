"use client";

import { useState } from "react";
import { registerUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from "react-icons/fa";

export default function RegisterPage() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPw,setShowPw] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleRegister = async (e:React.FormEvent) => {

    e.preventDefault();

    if(!name || !email || !password){
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try{

      await registerUser({
        name,
        email,
        password,
        role:"USER"
      });

      toast.success("Account created successfully");

      router.push("/login");

    }catch(error:any){

      toast.error(error?.response?.data?.message || "Registration failed");

    }finally{
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white flex-col justify-center px-16">

        <h1 className="text-4xl font-bold mb-6">
          Join TaskFlow
        </h1>

        <p className="text-indigo-100 mb-8 text-lg">
          Create an account and start organizing your work with a powerful task management system.
        </p>

        <div className="space-y-4">

          <Feature text="Create and manage tasks easily" />
          <Feature text="Track deadlines and priorities" />
          <Feature text="Secure user authentication" />
          <Feature text="Simple and clean dashboard" />

        </div>

      </div>


      {/* RIGHT PANEL */}

      <div className="flex flex-1 items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Register to start managing tasks
          </p>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* NAME */}

            <div className="relative">

              <FaUser className="absolute left-3 top-3 text-gray-400"/>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>


            {/* EMAIL */}

            <div className="relative">

              <FaEnvelope className="absolute left-3 top-3 text-gray-400"/>

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>


            {/* PASSWORD */}

            <div className="relative">

              <FaLock className="absolute left-3 top-3 text-gray-400"/>

              <input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={()=>setShowPw(!showPw)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <FaEyeSlash/> : <FaEye/>}
              </button>

            </div>


            {/* BUTTON */}

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >

              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}

            </button>

          </form>


          <p className="text-center text-sm text-gray-500 mt-6">

            Already have an account?{" "}

            <Link
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}


function Feature({text}:{text:string}){

  return(

    <div className="flex items-center gap-3">
      <FaCheckCircle/>
      <span>{text}</span>
    </div>

  );

}