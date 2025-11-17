	"use client"
// useEstatisticas.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

export function useEstatisticas() {
  return useQuery({
    queryKey: ['estatisticasClientes'],
    queryFn: async () => {
       const { data } = await axiosInstance.get('/clientes/estatisticas');
        console.log('[estatisticaClientes] Dados recebidos:', data);
      return data; // { ativos, atrasado, liquidado, renovado }
    },
      retry: false,
  });
}
