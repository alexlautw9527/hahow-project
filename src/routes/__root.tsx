import { isLocal } from "@configs";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* 需將 TanStackRouterDevtools 放在此處  */}
      {isLocal && <TanStackRouterDevtools initialIsOpen={false} />}
    </>
  ),
});
