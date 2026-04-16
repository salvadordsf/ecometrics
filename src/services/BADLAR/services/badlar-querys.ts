import { useQuery } from "@tanstack/react-query";
import { getLastBADLAR } from "./badlar-axios";

export const useLastBADLAR = () => {
  return useQuery({
    queryKey: ["lastBadlar"],
    queryFn: getLastBADLAR,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};