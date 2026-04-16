import { useQuery } from "@tanstack/react-query";
import { getLastGIR } from "./gir-axios";

export const useLastGIR = () => {
  return useQuery({
    queryKey: ["lastGIR"],
    queryFn: getLastGIR,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};