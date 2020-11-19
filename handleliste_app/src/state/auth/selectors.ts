import { selector } from "recoil";
import { authState } from "./atoms";

export const getLogginInfo = selector({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    const auth = get(authState);

    return {
      isLoggedIn: auth.isLoggedIn,
    };
  },
});
export const getTokens = selector({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    const auth = get(authState);

    return {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      expiresIn: auth.expiresIn,
    };
  },
});
