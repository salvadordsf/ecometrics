import { useQuery } from "@tanstack/react-query";
import { getICL } from "./icl-axios";

export const useICL = () => {
  return useQuery({
    queryKey: ["icl"],
    queryFn: getICL,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};