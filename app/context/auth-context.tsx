"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

    
    useEffect(() => {
    const initAuth = () => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        // atualiza ambos de uma vez
        setToken(savedToken);
        setUser(payload);
        }
    };

    initAuth();
    }, []);



  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
