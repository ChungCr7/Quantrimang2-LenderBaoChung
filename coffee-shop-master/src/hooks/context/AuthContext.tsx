import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// ================= USER TYPE ==================
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  mobileNumber?: string;
  address?: string;

  // ⭐ Avatar đúng backend UserDtls.java
  profileImage?: string | null;
}

interface LoginPayload {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginPayload) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // ================= LOAD LOCAL STORAGE =================
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("coffee-auth");
      return saved ? JSON.parse(saved).user : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem("coffee-auth");
      return saved ? JSON.parse(saved).token : null;
    } catch {
      return null;
    }
  });

  // ========================================================
  // ⭐ REFRESH USER — luôn load profile + avatar mới
  // ========================================================
  const refreshUser = async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const apiUser = res.data.user || res.data;

      const updatedUser: User = {
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        role: apiUser.role || apiUser.roles?.[0] || "ROLE_USER",
        mobileNumber: apiUser.mobileNumber,
        address: apiUser.address,

        // ⭐ Avatar từ backend
        profileImage: apiUser.profileImage ?? null,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "coffee-auth",
        JSON.stringify({ token, user: updatedUser })
      );

    } catch (err) {
      console.error("❌ Refresh user failed:", err);
    }
  };

  useEffect(() => {
    if (token) refreshUser();
  }, [token]);

  // ========================================================
  // ⭐ LOGIN — Lưu user vào localStorage + state
  // ========================================================
  const login = (data: LoginPayload) => {
    const { token, user } = data;

    const cleanUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobileNumber: user.mobileNumber,
      address: user.address,

      // ⭐ avatar khi login
      profileImage: user.profileImage ?? null,
    };

    localStorage.setItem("coffee-auth", JSON.stringify({ token, user: cleanUser }));

    setToken(token);
    setUser(cleanUser);

    console.log("User login success:", cleanUser);
  };

  // ========================================================
  // ⭐ LOGOUT
  // ========================================================
  const logout = () => {
    localStorage.removeItem("coffee-auth");
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
