import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../services/axiosInstance"

export const useUtilizadores = () => {

    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const {data} = await axiosInstance.get('/users');
            return data;
        },
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    })
}