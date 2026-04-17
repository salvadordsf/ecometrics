import { useQuery } from "@tanstack/react-query";
import { getLastUSDExchange, getUSDVariation } from "./usd-axios";

export const useUSDSExchange = () => {
  return useQuery({
    queryKey: ["usdsExchange"],
    queryFn: getLastUSDExchange,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

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
