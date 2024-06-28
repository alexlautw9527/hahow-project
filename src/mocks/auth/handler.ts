// import { http, delay } from "msw";
// import { accountApiBaseURL } from "@configs";
// import { apiPath, API_SERVICES } from "@services/constants";
// import { mockUserData } from "@mocks/auth/mockData";
// import { concatFullUrl } from "@helpers";
// import { createMockResponse } from "@mocks/helpers";
// import { MOCK_RESPONSE_TIMES } from "@mocks/constants";

// import type { GetUserInfoData } from "@services";

export const authHandlers = [
  // http[apiPath[API_SERVICES.GET_USER_INFO].method](
  //   concatFullUrl(accountApiBaseURL, apiPath[API_SERVICES.GET_USER_INFO].path),
  //   async ({ request }) => {
  //     await delay(MOCK_RESPONSE_TIMES.MEDIUM);
  //     if (request.headers.get("Authorization")) {
  //       return createMockResponse<GetUserInfoData | undefined>({
  //         data: mockUserData,
  //       });
  //     }
  //     return createMockResponse<GetUserInfoData | undefined>({
  //       data: undefined,
  //       code: 401,
  //       msg: "Unauthorized",
  //     });
  //   },
  // ),
];
