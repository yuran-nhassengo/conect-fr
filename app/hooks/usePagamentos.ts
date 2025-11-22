import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../services/axiosInstance"

export const usePagamentos = () => {

    return useQuery({
        queryKey: ['pagamentos'],
        queryFn: async () => {
            const {data} = await axiosInstance.get('/pagamentos');
            console.log("pagamentos retornados...",data);
            return data;
        },
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    })
}