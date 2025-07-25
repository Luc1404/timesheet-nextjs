import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây (hiện tại chỉ kiểm tra đơn giản)
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    setError("");
    // TODO: Gọi API đăng nhập hoặc điều hướng
    alert(`Đăng nhập với email: ${email}`);
  };

  return (
    <div style={{ maxWidth: 350, margin: "60px auto", padding: 32, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
            placeholder="Nhập email"
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        {error && <div style={{ color: "#f44336", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 12, background: "#f44336", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
} 