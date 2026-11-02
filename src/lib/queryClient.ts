import { QueryClient } from '@tanstack/react-query';

/**
 * One QueryClient for the whole app (used by QueryClientProvider in _layout).
 * - retry: 1        → retry a failed request once, then give up.
 * - no refetch on focus → mobile apps don't need aggressive refetching.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
