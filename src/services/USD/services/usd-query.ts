import { useQuery } from "@tanstack/react-query";
import { getUSDVariation } from "./usd-axios";

export const useUSDVariation = () => {
  return useQuery({
    queryKey: ["usdVariation"],
    queryFn: getUSDVariation,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
