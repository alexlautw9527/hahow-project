// 將所有 Msg key 聯合型別再進行聯合, 主要給 App.tsx 處理 global error message 使用
// 等後續有 msg key 需求再進行擴充
export type ApiMsgKey = "" | "";

export type { AuthReqBody, AuthData } from "@services/apis/auth";

export { authApi } from "@services/apis/auth";
