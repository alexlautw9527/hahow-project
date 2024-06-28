import createService from "@services/apiServiceFactory";
import { apiBaseUrl } from "@configs";
import { apiPath, API_SERVICES } from "@services/constants";

export type AuthReqBody = {
  ticket: string;
};

export type AuthData = {
  accessToken: string;
};

export const authApi = {
  [API_SERVICES.auth]: createService<{ reqBody: AuthReqBody }, AuthData>({
    url: apiPath[API_SERVICES.auth].path,
    method: apiPath[API_SERVICES.auth].method,
    baseURL: apiBaseUrl,
    authRequired: false,
  }),
};
