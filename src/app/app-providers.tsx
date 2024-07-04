import { Provider } from 'react-redux';
import { store } from '@/stores';
import {
  ChakraBaseProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const customTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'teal',
  }),
  {
    fonts: {
      heading: `'Anton', sans-serif`,
      body: 'Inter, sans-serif',
    },
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraBaseProvider theme={customTheme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </ChakraBaseProvider>
  );
}
