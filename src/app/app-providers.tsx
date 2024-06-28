import { Provider } from 'react-redux';
import { store } from '@/stores';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createRouter } from '@tanstack/react-router';

import { routeTree } from '@/app/routeTree.gen';

const router = createRouter({
  routeTree,
});

// TanStack Router 型別安全的起手式
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* {isLocal && <ReactQueryDevtools initialIsOpen={false} />} */}
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
