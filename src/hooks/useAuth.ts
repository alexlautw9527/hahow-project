import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@services";

import {
  isLoginSelector,
  updateLogin,
  updateLogout,
} from "@store/global/globalSlice";

import {
  setLocalStorageItem,
  removeLocalStorageItem,
  LOCAL_STORAGE_KEYS,
} from "@helpers";
import { API_SERVICES } from "@services/constants";

export type UseAuth = ReturnType<typeof useAuth>;

export function useAuth() {
  const dispatch = useDispatch();

  const isLogin = useSelector(isLoginSelector);

  const mutation = useMutation({
    mutationKey: [API_SERVICES.auth],
    // 保持 api service 的參數, 但插入 productId
    mutationFn: authApi.auth,
    onSuccess: async (result) => {
      const { accessToken } = result.data ?? {};

      if (!accessToken) return;
      setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

      dispatch(updateLogin());
      // 登入成功後, 取得 userData
    },
    // onError 統一交由 App.tsx 的 global error handler 處理
  });

  const logout = async () => {
    removeLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    dispatch(updateLogout());
  };

  return {
    auth: mutation.mutate,
    logout,
    isLogin,
    ...mutation,
  };
}
