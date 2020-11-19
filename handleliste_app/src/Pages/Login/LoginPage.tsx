import React, { MouseEvent, useState } from "react";
import { authService } from "../../services/authService";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signin = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault;
    const response = await authService.signin(username, password);
    console.log(response);
  };
  return (
    <div>
      <form>
        <span>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
        <span>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <button onClick={signin}>Singin</button>
      </form>
    </div>
  );
};

export default LoginPage;
