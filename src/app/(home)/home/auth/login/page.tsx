"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Email ve şifre girin.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res || res.error) {
      setLoading(false);
      alert(res?.error || "Giriş başarısız");
      return;
    }

    redirect("/home");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md shadow-2xl flex flex-col gap-5 sm:gap-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 text-center">
          Giriş
        </h1>

        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-gray-800 hover:bg-gray-700 transition-colors text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg border border-white/10 disabled:opacity-60"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş"}
        </button>

        <p className="text-gray-300 text-center text-xs sm:text-sm">
          Hesabınız yok mu?{" "}
          <span
            onClick={() => redirect("/home/auth/register")}
            className="text-gray-100 underline cursor-pointer hover:text-white transition"
          >
            Hesap Oluştur
          </span>
        </p>
      </motion.div>
    </div>
  );
}
