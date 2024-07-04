import { RouterProvider, createRouter } from '@tanstack/react-router';

import { setupAxiosInterceptors } from '@/lib/api/setup-axios';
import { routeTree } from '@/app/routeTree.gen';
import '@/app/index.css';

const router = createRouter({
  routeTree,
});

export default function App() {
  setupAxiosInterceptors();

  return <RouterProvider router={router} />;
}
