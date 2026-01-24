"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Tüm alanları doldurun.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Şifreler uyuşmuyor.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Kayıt başarısız");
      }

      router.push("/home/auth/login");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md shadow-2xl flex flex-col gap-5 sm:gap-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 text-center">Hesap Oluştur</h1>

        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="email"
            placeholder="E-posta Adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="password"
            placeholder="Şifre Tekrar"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`p-3 sm:p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${confirmPassword && password !== confirmPassword ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-gray-500"} focus:outline-none focus:ring-2`}
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-gray-800 hover:bg-gray-700 transition-colors text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg border border-white/10 disabled:opacity-60"
        >
          {loading ? "Oluşturuluyor..." : "Kayıt Ol"}
        </button>

        <p className="text-gray-300 text-center text-xs sm:text-sm">
          Zaten hesabın var mı?{" "}
          <span onClick={() => router.push("/home/auth/login")} className="text-gray-100 underline cursor-pointer hover:text-white transition">
            Giriş Yap
          </span>
        </p>
      </motion.div>
    </div>
  );
}
