import { useQuery } from "@tanstack/react-query";
import { getInflation, getLastInflation } from "./inflation-axios";

export const useLastInflation = () => {
  return useQuery({
    queryKey: ["lastInflation"],
    queryFn: getLastInflation,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useInflation = () => {
  return useQuery({
    queryKey: ["inflation"],
    queryFn: getInflation,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
