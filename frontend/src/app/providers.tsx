'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Гарантирует создание QueryClient строго один раз при инициализации клиента / connector between serv and comp
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // error handler for fetches
        queryCache: new QueryCache({
          onError: (error) => {
            toast.error(`Data error: ${error.message}`);
          },
        }),

        // error handler for mutations / actions
        mutationCache: new MutationCache({
          onError: (error) => {
            toast.error(`Action error: ${error.message}`);
          },
        }),

        // prevent spam on back
        defaultOptions: {
          queries: {
            // 5 minutes fresh
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
