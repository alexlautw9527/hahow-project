import { setupWorker } from "msw/browser";
import { mswHandlers } from "@mocks/handlers";

export const worker = setupWorker(...mswHandlers);
