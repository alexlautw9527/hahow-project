export const API_SERVICES = {
  auth: 'auth',
} as const;

export const apiPath = {
  [API_SERVICES.auth]: {
    path: '/permission/auth',

    // 使用小寫, 讓 axios 和 msw 都能使用
    method: 'post',
  },
} as const;
