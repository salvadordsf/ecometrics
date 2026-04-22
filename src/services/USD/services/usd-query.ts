import { useQuery } from "@tanstack/react-query";
import { getLastUSDExchange, getUSDCasaExchange, getUSDCasaVariationExchange, getUSDVariation } from "./usd-axios";
import { USDCasaType } from "@/src/types/dolar-api-types";

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

export const useUSDCasaExchange = (casa: USDCasaType) => {
  return useQuery({
    queryKey: ["usdExchange", casa],
    queryFn: () => getUSDCasaExchange(casa),

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useUSDCasaExchangeVariation = (casa: USDCasaType, startDate: string) => {
  return useQuery({
    queryKey: ["usdExchangeVariation", casa, startDate],
    queryFn: () => getUSDCasaVariationExchange(casa, startDate),

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useUSDVariation = (limit = 3000) => {
  return useQuery({
    queryKey: ["usdVariation", limit],
    queryFn: () => getUSDVariation(limit),

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
