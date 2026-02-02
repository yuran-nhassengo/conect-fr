"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "../services/axiosInstance";
import * as jwt_decode from 'jwt-decode';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  empresaId?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  logout: () => void;
  refetchUser: () => void;
}

interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  role: string;
  empresaId?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  // Decodifica o token para pegar os dados do usuário imediatamente
  const [user, setUser] = useState<User | null>(() => {
    if (!token) return null;
    try {
     
      const decoded: JwtPayload = (jwt_decode as any)(token);
      return {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        empresaId: decoded.empresaId,
      };
    } catch (e) {
      return null;
    }
  });

  // Re-fetch do backend caso o token seja válido
  const { refetch } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      if (!token) return null;
      const res = await axiosInstance.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data); // atualiza o state com dados do backend
      return res.data;
    },
    enabled: !!token,
  });

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["authUser"] });
    router.replace("/");
  };

  const refetchUser = () => refetch();

  return (
    <AuthContext.Provider value={{ user, token, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
