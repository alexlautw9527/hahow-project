/* eslint-disable @typescript-eslint/no-throw-literal */
import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import AuthPage from "@pages/auth/AuthPage";

const authSearchSchema = z.object({
  ticket: z.string({ coerce: true }).optional(),
});
export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: (search) => authSearchSchema.parse(search),
});
