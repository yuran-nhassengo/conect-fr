import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';


export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      console.log('[useDashboard] Requisição iniciada');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!token) {
        throw new Error('Token não encontrado. Faça login primeiro.');
      }

      const { data } = await axiosInstance.get('/dashboard');
      console.log('[useDashboard] Dados recebidos:', data);
      return data;
    },
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'), // só dispara se houver token
    retry: false, // evita múltiplas tentativas em caso de 401
  });
}
