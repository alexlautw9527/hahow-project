/**
 * 這個函數用來產生一個模擬的 JWT, 以利測試
 *
 * JWT 由三部分組成: header, payload, signature
 * 已有將生成出來的 模擬 JWT 到 https://jwt.io/ 測試, 可正確解析出 payload
 */
export const createMockJwt = (payload: object) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const encode = (obj: object) =>
    window
      .btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  return `${encode(header)}.${encode(payload)}.signature`;
};

/**
 * 解析 JWT 的 payload 部分
 *
 * source: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
 * @param token - JWT
 * @returns - 解析後的 payload
 */
export const parseJwt = (token: string) => {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (_e) {
    return null;
  }
};

export const checkTokenExpired = (token: string) => {
  const decodedToken = parseJwt(token);
  const currentTime = Date.now() / 1000;

  if (!decodedToken?.exp) return true;
  return decodedToken?.exp < currentTime;
};
