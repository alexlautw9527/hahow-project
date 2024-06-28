import { checkTokenExpired, createMockJwt, parseJwt } from "@helpers";

describe("parseJwt", () => {
  it("應正確解析 JWT - parseJwt", () => {
    const token = createMockJwt({ name: "John Doe" });

    const result = parseJwt(token);
    const expectedResult = { name: "John Doe" };
    expect(result).toEqual(expectedResult);
  });

  it("碰到錯誤的 token, 應回傳 null - parseJwt", () => {
    const token = "wrong";

    const result = parseJwt(token);
    expect(result).toBeNull();
  });
});

describe("checkTokenExpired", () => {
  it("應正確檢查 token 是否過期 - checkTokenExpired", () => {
    const token = createMockJwt({ exp: Date.now() / 1000 + 60 });

    const result = checkTokenExpired(token);
    expect(result).toBe(false);
  });

  it("碰到錯誤的 token, 應回傳 true - checkTokenExpired", () => {
    const token = "wrong";

    const result = checkTokenExpired(token);
    expect(result).toBe(true);
  });

  it("碰到過期的 token, 應回傳 true - checkTokenExpired", () => {
    const token = createMockJwt({ exp: Date.now() / 1000 - 60 });

    const result = checkTokenExpired(token);
    expect(result).toBe(true);
  });
});
