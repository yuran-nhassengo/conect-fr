"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "../services/axiosInstance";

interface User {
  id: number;
  name: string;
  email: string;
  empresaId: number;
  password?: string;
}

export function useUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User | null>(
    ["user"],
    async () => {
      // Tentar pegar do localStorage
      const local = localStorage.getItem("user");
      if (local) return JSON.parse(local);

      // Buscar da API via Axios
      const res = await axiosInstance.get("/auth/me"); // endpoint que retorna usuário logado
      const data = res.data;

      // Salvar no localStorage
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    },
    {
      onError: () => {
        localStorage.removeItem("user");
        queryClient.removeQueries(["user"]);
        router.replace("/"); // redireciona se não estiver logado
      },
    }
  );

  const logout = () => {
    localStorage.removeItem("user");
    queryClient.removeQueries(["user"]);
    router.replace("/"); // leva à página inicial
  };

  return { user, isLoading, isError, logout };
}
