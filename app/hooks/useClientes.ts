"use client";

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

export function useClientes() {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/clientes');
       console.log('[useDashboard] Dados recebidos:', data);
      return data;
    },
    retry: false,
  });
}
