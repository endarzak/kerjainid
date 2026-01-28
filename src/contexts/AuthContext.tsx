import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "worker" | "employer";

export interface AuthUser {
  id: string;
  fullName: string;
  phone: string;
  role: UserRole;
  email?: string;
  companyName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  requireAuth: (callback: () => void, redirectPath?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("kerjain_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("kerjain_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kerjain_user");
  };

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
