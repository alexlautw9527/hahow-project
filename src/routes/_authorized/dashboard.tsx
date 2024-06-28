import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized/dashboard")({
  component: DashboardPage,
});

// TODO: 後續搬遷到 pages/dashboard
function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
