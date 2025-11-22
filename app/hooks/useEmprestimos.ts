import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

// Hook genérico para pegar empréstimos
export const useEmprestimos = () => {
  
  return useQuery({
    queryKey: ['emprestimos'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/emprestimos'); // backend
      return data;
    },
    staleTime: 1000 * 60, // 1 minuto em cache
    refetchOnWindowFocus: false, // não refaz ao voltar a aba
  });
};
