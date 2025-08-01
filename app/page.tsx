"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "../components/Login";
import { useAuth } from "../components/AuthContext";

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (email: string, password: string) => {
    setLoginError("");
    const success = await login(email, password);
    if (!success) {
      setLoginError("Thông tin đăng nhập không chính xác hoặc có lỗi kết nối.");
      throw new Error("Login failed");
    }
  };

  return <Login onLogin={handleLogin} error={loginError} />;
}
