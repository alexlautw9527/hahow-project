import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { isLocal } from '@/configs/env';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* 需將 TanStackRouterDevtools 放在此處  */}
      {isLocal && <TanStackRouterDevtools initialIsOpen={false} />}
    </>
  ),
});
