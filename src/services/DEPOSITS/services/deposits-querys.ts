import { useQuery } from "@tanstack/react-query";
import { getARSDeposits, getMEDeposits } from "./deposits-axios";

export const useARSDeposits = () => {
  return useQuery({
    queryKey: ["ARSDeposits"],
    queryFn: getARSDeposits,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useMEDeposits = () => {
  return useQuery({
    queryKey: ["MEDeposits"],
    queryFn: getMEDeposits,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
