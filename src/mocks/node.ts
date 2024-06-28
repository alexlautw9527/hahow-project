import { setupServer } from "msw/node";
import { mswHandlers } from "@/mocks/handlers";

// 在測試 (Vitest) 環境中, 使用此程式來建立 server
export const server = setupServer(...mswHandlers);
