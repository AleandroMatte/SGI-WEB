import LoginPage from "./LoginPage";
import { useState } from "react";
import { backApi } from "../../services/api";

export default function LoginPageContainer() {
  const [username, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswd(e.target.value);
  }

  async function handleSubmit() {
    setIsLoading(true);
    await backApi
      .post(
        "/security/login/",
        {},
        { auth: { username: username, password: passwd } }
      )
      .then((response) => response.data)
      .then((data: { token: string }) => {
        backApi.defaults.headers.common["Authorization"] =
          `Token ${data.token}`;
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }
  return (
    <LoginPage
      username={username}
      passwd={passwd}
      isLoading={isLoading}
      handleUserNameChange={handleUserNameChange}
      handlePasswordChange={handlePasswordChange}
      handleFormSubmit={handleSubmit}
    />
  );
}
