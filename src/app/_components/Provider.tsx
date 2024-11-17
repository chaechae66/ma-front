"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: React.ReactNode;
}

const HOURS = 1000 * 60 * 60;

export default function Provider({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 18 * HOURS,
        gcTime: 24 * HOURS,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
