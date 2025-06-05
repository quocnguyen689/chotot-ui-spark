import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { ApiError } from "@/lib/api";

interface QueryProviderProps {
  children: ReactNode;
}

// Default query options
const defaultQueryOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount: number, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: "always" as const,
  },
  mutations: {
    retry: false,
    onError: (error: ApiError) => {
      console.error("Mutation error:", error);
      // You can add global error handling here
      // For example, show a toast notification
    },
  },
};

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: defaultQueryOptions,
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show DevTools only in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
