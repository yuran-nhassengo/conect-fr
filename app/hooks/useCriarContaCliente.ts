import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../services/axiosInstance";


export function useCriarContaCliente() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clienteId: number) => {
        const response = await axiosInstance.post('/users/criar-conta-cliente',{clienteId});
        return response.data;
    },

    onSuccess: (data) => {
      toast.success("Conta criada com sucesso!");

      console.log("Credenciais geradas:", data.credenciais);
      // {
      //   email, senhaTemporaria,
      //   clienteId, empresaId
      // }
      queryClient.invalidateQueries({
        queryKey: ["cliente"],
      });
    },

    onError: () => {
      toast.error("Erro ao criar conta do cliente.");
    },
  });
}
