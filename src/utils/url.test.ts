import { concatFullUrl } from '@/utils/url';

describe('concatFullUrl', () => {
  it('應正確串接基本 URL 和路徑 - concatFullUrl', () => {
    const baseUrl = 'https://example.com/api/v1';
    const path = '/users';

    const result = concatFullUrl(baseUrl, path);

    expect(result).toBe('https://example.com/api/v1/users');
  });

  it('應正確處理相對路徑, 添加斜線 - concatFullUrl', () => {
    const baseUrl = 'https://example.com/api/v1';
    const path = 'users';

    const result = concatFullUrl(baseUrl, path);

    expect(result).toBe('https://example.com/api/v1/users');
  });

  it('會去除多餘斜線 - concatFullUrl', () => {
    const baseUrl = 'https://example.com/api/v1/';
    const path = '/users';

    const result = concatFullUrl(baseUrl, path);

    expect(result).toBe('https://example.com/api/v1/users');
  });
});
