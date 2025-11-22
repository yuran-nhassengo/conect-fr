import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

export const useCreateEmprestimo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/emprestimos', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['emprestimos']); // atualiza lista
    },
  });
};
