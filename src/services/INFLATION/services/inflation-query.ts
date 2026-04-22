import { useQuery } from "@tanstack/react-query";
import {
  getInflation,
  getLastAnnualInflation,
  getLastInflation,
  getREMInflation,
} from "./inflation-axios";

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

export const useLastAnnualInflation = () => {
  return useQuery({
    queryKey: ["lastAnnualInflation"],
    queryFn: getLastAnnualInflation,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useLastREMInflation = () => {
  return useQuery({
    queryKey: ["lastREMInflation"],
    queryFn: getREMInflation,

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useInflation = (limit = 3000) => {
  return useQuery({
    queryKey: ["inflation", limit],
    queryFn: () => getInflation(limit),

    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
