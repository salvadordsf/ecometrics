import { useQuery } from "@tanstack/react-query";
import { getLastPrivateDebts } from "./debt-axios";

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
