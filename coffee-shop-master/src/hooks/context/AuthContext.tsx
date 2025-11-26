import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  mobileNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  profileImage?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: any) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==============================
//  WRAPPER ĐỂ DÙNG useNavigate
// ==============================
export const AuthProviderWrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export const AuthProvider = ({
  children,
  navigate,
}: {
  children: ReactNode;
  navigate: any;
}) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("coffee-shop-auth-user");
      if (!saved) return null;
      return JSON.parse(saved).user || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem("coffee-shop-auth-user");
      if (!saved) return null;
      return JSON.parse(saved).token || null;
    } catch {
      return null;
    }
  });

  // ============================
  // REFRESH USER
  // ============================
  const refreshUser = async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newUser = res.data.user || res.data;
      setUser(newUser);

      const saved = localStorage.getItem("coffee-shop-auth-user");
      const parsed = saved ? JSON.parse(saved) : {};
      parsed.user = newUser;
      localStorage.setItem("coffee-shop-auth-user", JSON.stringify(parsed));

      console.log("✅ User cập nhật:", newUser);
    } catch (error) {
      console.error("❌ Lỗi khi gọi /api/user/me:", error);
    }
  };

  useEffect(() => {
    if (token) refreshUser();
  }, [token]);

  // ============================
  // LOGIN — THÊM CHECK ROLE
  // ============================
  const login = (userData: any) => {
    const { token: newToken, user } = userData;

    localStorage.removeItem("coffee-shop-auth-user");
    localStorage.removeItem("coffee-shop-token");
    localStorage.removeItem("coffee-shop-auth-user-address");

    const newData = {
      user: {
        id: user?.id || null,
        name: user?.name || null,
        email: user?.email || null,
        role: user?.role || null,
      },
      token: newToken,
    };

    localStorage.setItem("coffee-shop-auth-user", JSON.stringify(newData));
    setToken(newToken);
    setUser(user || null);

    // 🔥 Điều hướng theo role
    if (user?.role === "ROLE_ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home");
    }

    console.log("✅ Đăng nhập thành công:", newData);

    if (!user) refreshUser();
  };

  const logout = () => {
    console.log("🚪 Đăng xuất...");
    setUser(null);
    setToken(null);
    localStorage.removeItem("coffee-shop-auth-user");
    localStorage.removeItem("coffee-shop-token");
    localStorage.removeItem("coffee-shop-auth-user-address");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
