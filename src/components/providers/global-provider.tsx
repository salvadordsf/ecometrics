"use client";

import { queryClient } from "@/src/lib/react-query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
