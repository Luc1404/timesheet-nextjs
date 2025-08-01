"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  name: string;
  role: string;
  accessToken: string;
  userId: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Helper function to set cookie
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Helper function to get cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Kiểm tra trạng thái đăng nhập từ localStorage và cookie khi component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("user");
    const cookieAuth = getCookie("isAuthenticated");
    
    if ((savedAuth === "true" || cookieAuth === "true") && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://training-api-timesheet.nccsoft.vn/api/TokenAuth/Authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userNameOrEmailAddress: email,
          password: password,
          rememberClient: true
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const userData: User = {
            email: email,
            name: data.result?.userName || email,
            role: data.result?.role || 'user',
            accessToken: data.result?.accessToken,
            userId: data.result?.userId
          };
          
          setIsAuthenticated(true);
          setUser(userData);
          
          // Lưu vào localStorage và cookie
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("accessToken", data.result?.accessToken || '');
          setCookie("isAuthenticated", "true", 7); // Cookie tồn tại 7 ngày
          
          return true;
        } else {
          console.error('Login failed:', data.error);
          return false;
        }
      } else {
        console.error('Login request failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Xóa khỏi localStorage và cookie
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    deleteCookie("isAuthenticated");
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 