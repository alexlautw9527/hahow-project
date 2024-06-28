/* eslint-disable @typescript-eslint/no-throw-literal */
import { redirectToLoginPage } from "@helpers";
import { useAuth } from "@hooks/useAuth";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * 首頁根路徑('/')
 */
export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { isLogin } = useAuth();

  useEffect(() => {
    if (!isLogin) {
      redirectToLoginPage();
    }
  }, [isLogin]);

  if (isLogin) {
    return <Navigate to="/dashboard" />;
  }

  return null;
}
