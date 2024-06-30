import { RouterProvider, createRouter } from '@tanstack/react-router';

import { setupAxiosInterceptors } from '@/lib/api/setup-axios';
import { routeTree } from '@/app/routeTree.gen';
import '@/app/index.css';

const router = createRouter({
  routeTree,
});

// TanStack Router 型別安全的起手式
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  setupAxiosInterceptors();

  return <RouterProvider router={router} />;
}
