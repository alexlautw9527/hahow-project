import { redirectToLoginPage, redirectToLogout } from "@helpers";
import { useAuth } from "@hooks/useAuth";
import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * layout 的用途:
 * 只要以 prefix "_" 作為檔名開頭, 就會視為 layout
 * layout 子路由的頁面都會套用此 layout 邏輯
 * 但 layout 本身不會被顯示在網址列 path 上
 * https://tanstack.com/router/latest/docs/framework/react/guide/route-trees#pathless-routes
 */
export const Route = createFileRoute("/_authorized")({
  component: AuthorizedLayout,
});

/**
 * 暫時先記錄如何客製化 Link 且能維持 tanstack router 的 path 型別
 */
function StyledLink({
  children,
  ...rest
}: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  return (
    <Link
      className="[&.active]:font-bold text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition-colors duration-200 p-2"
      {...rest}
    >
      {children}
    </Link>
  );
}

function AuthorizedLayout() {
  const { logout, isLogin } = useAuth();

  useEffect(() => {
    if (!isLogin) {
      redirectToLoginPage();
    }
  }, [isLogin]);

  // 避免未登入時, 還會閃一下顯示
  if (!isLogin) {
    return null;
  }

  return (
    <div>
      <div className="p-2 flex gap-2">
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
        <button
          type="button"
          onClick={async () => {
            await logout();
            redirectToLogout();
          }}
        >
          登出
        </button>
      </div>
      <hr className="mb-4" />
      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
}
