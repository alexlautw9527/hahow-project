import { Navigate, createFileRoute } from '@tanstack/react-router';

/**
 * 首頁根路徑('/')
 */
export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return <Navigate to="/heroes" />;
}
