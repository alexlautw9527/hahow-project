import { createFileRoute } from "@tanstack/react-router";

// TODO: 測試驗證保護路由功能, 之後會視情況刪除
export const Route = createFileRoute("/_authorized/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
