import React, { useState } from "react";
import { Shield, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../../lib/axios.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      // If logged in Successfull Set localstorage token
      if (res.data && res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/main-dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error logging in:", error.response.data.message);
      } else {
        console.error("Error logging in:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] font-sans">
      {/* Branding Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-[#CCA328] rounded-xl flex items-center justify-center mb-4 shadow-sm">
          <Shield className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sentinel</h1>
        <p className="text-sm text-slate-500 font-medium">
          DMCA Operations Console
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] w-full max-w-[440px] p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-slate-500">
            Enter your credentials to access the console.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="agent@sentinel.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FDFDFD] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-[#CCA328] focus:ring-1 focus:ring-[#CCA328] text-sm text-gray-900 placeholder-slate-400 transition-colors"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                placeholder="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FDFDFD] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-[#CCA328] focus:ring-1 focus:ring-[#CCA328] text-sm text-gray-900 placeholder-slate-400 transition-colors tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#CCA328] hover:bg-[#B89224] text-white font-semibold py-2.5 rounded-md transition-colors shadow-sm text-sm"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <p className="text-xs text-slate-500 font-medium">
          Sentinel v1.0.0 · Internal Use Only
        </p>
      </div>
    </div>
  );
}
