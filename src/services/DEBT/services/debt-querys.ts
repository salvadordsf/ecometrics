import { useQuery } from "@tanstack/react-query";
import { getLastPrivateDebts, getPrivateDebts } from "./debt-axios";

export const useLastPrivateDebt = () => {
  return useQuery({
    queryKey: ["lastPrivateDebt"],
    queryFn: getLastPrivateDebts,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const usePrivateDebt = (limit = 3000) => {
  return useQuery({
    queryKey: ["privateDebt", limit],
    queryFn: () => getPrivateDebts(limit),

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};