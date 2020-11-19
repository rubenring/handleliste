import React, { FC } from "react";
import { RouteProps, useHistory, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getLogginInfo } from "../state/auth/selectors";

interface AuthenticationProps extends RouteProps {}

export const Authentication: FC<AuthenticationProps> = ({ children }, rest) => {
  const history = useHistory();
  const { isLoggedIn } = useRecoilValue(getLogginInfo);
  if (!isLoggedIn) {
    history.push("/login");
  }
  return (
    <>
      <Route {...rest}>{children}</Route>
    </>
  );
};

export default Authentication;
