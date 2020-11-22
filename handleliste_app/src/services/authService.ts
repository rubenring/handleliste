import axios, { AxiosResponse } from "axios";

type AuthService = {
  signin: (username: string, password: string) => Promise<AxiosResponse<any>>;
};

export const authService: AuthService = {
  signin: (username: string, password: string) =>
    axios.post("http://localhost:5000/api/auth/signin", {
      username,
      password,
    }),
};
