import { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { getRouteApi, useRouter, Navigate } from "@tanstack/react-router";
import { redirectToLoginPage } from "@helpers";

const routerApi = getRouteApi("/auth");

export default function AuthPage() {
  const { isLogin, auth, isSuccess, isError, isIdle } = useAuth();
  const { ticket } = routerApi.useSearch();
  const { navigate } = useRouter();

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: "/dashboard" });
    }

    if (isError) {
      redirectToLoginPage();
    }
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    if (ticket && !isLogin && isIdle) {
      auth({ reqBody: { ticket } });
    }
  }, [ticket, isLogin, isIdle, auth]);

  if (isLogin) {
    return <Navigate to="/dashboard" />;
  }

  // 若 query param 中沒有 ticket, 則導回 migo 登入頁
  if (!ticket) {
    redirectToLoginPage();
    return null;
  }

  return null;
}
