// hooks/useCliente.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

export function useCliente(clienteId?: number) {
  return useQuery({
    queryKey: ["cliente", clienteId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/clientes/${clienteId}`);

      console.log("O cliente: ",data);
      return data;
    },
    enabled: !!clienteId, // só busca se clienteId existir
    retry: false,
  });
}
