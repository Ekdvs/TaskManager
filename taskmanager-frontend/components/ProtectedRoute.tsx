"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); }
    else { setChecked(true); }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-10 h-10 bg-[#7c6af7] rounded-2xl flex items-center justify-center opacity-80">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M3 9l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="spinner w-6 h-6" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}