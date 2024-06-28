/**
 * 拼接基本 URL 和路徑, 自動處理重複斜線問題
 * 原因: 使用 msw 不像 axios 可以設 baseUrl, 而容易有拼接錯誤問題
 * reference: https://github.com/mswjs/msw/issues/397#issuecomment-751230924
 * @param baseUrl - 基本 URL
 * @param path - 要拼接的 path
 * @returns 完整的 URL
 */

export const concatFullUrl = (
  baseUrl: string,
  path: string,
  queryParams?: Record<string, string>,
) => {
  // 確保 baseUrl 結尾沒有斜線
  const normalizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;
  // 確保 path 開頭沒有不必要的斜線, 避免覆蓋掉完整的 baseUrl (URL api 的預設行為)
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  // 使用 URL 進行拼接
  const url = new URL(normalizedPath, `${normalizedBaseUrl}/`);
  // 添加 query params
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.href;
};
