"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  error?: string;
}

export default function Login({ onLogin, error }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cập nhật lỗi khi prop error thay đổi
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setIsLoading(true);
    
    if (!email || !password) {
      setLocalError("Vui lòng nhập đầy đủ thông tin.");
      setIsLoading(false);
      return;
    }

    try {
      await onLogin(email, password);
    } catch (error) {
      setLocalError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập Google
    console.log("Google login clicked");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#00BCD4", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      {/* Logo/Tên ứng dụng */}
      <Typography
        variant="h3"
        sx={{
          color: "#ebeff3ff", 
          fontWeight: 600,
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        Timesheet
      </Typography>

      {/* Form đăng nhập */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: 2,
          background: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#424242",
            fontWeight: 600,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Log in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Email field */}
          <TextField
            fullWidth
            placeholder="User name or email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#888", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />

          {/* Password field */}
          <TextField
            fullWidth
            placeholder="Password *"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#888", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />

          {/* Remember me checkbox */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  sx={{ color: "#888" }}
                />
              }
              label="Remember me"
              sx={{ color: "#424242" }}
            />
          </Box>

          {/* Error message */}
          {localError && (
            <Typography
              variant="body2"
              sx={{
                color: "#f44336",
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              {localError}
            </Typography>
          )}

          {/* Login button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              background: "#E91E63", 
              color: "#fff",
              padding: "12px",
              borderRadius: 1,
              fontSize: "16px",
              fontWeight: 500,
              marginBottom: 2,
              textTransform: "none",
              "&:hover": {
                background: "#C2185B",
              },
              "&:disabled": {
                background: "#ccc",
              },
            }}
          >
            {isLoading ? "Đang đăng nhập..." : "Log in"}
          </Button>

          {/* Google login button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{
              background: "#1565C0",
              color: "#fff",
              padding: "12px",
              borderRadius: 1,
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                background: "#0D47A1",
              },
              "&:disabled": {
                background: "#ccc",
              },
            }}
          >
            Log In With Google
          </Button>
        </Box>
      </Paper>

      {/* Footer */}
      <Typography
        variant="body2"
        sx={{
          color: "#424242",
          marginTop: 4,
          textAlign: "center",
        }}
      >
        © 2025 Timesheet. Version 4.3.0.0 [20251703]
      </Typography>
    </Box>
  );
} 