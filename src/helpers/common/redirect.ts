import { PRODUCT_IDS } from "@constants";
import { authPageBaseUrl } from "@configs";
import { concatFullUrl } from "@helpers/string/url";

export const redirectToLoginPage = () => {
  window.location.href = concatFullUrl(authPageBaseUrl, "/login", {
    productId: PRODUCT_IDS.LIT_JOURNEY,
  });
};

export const redirectToLogout = () => {
  window.location.href = concatFullUrl(authPageBaseUrl, "/logout", {
    productId: PRODUCT_IDS.LIT_JOURNEY,
  });
};
