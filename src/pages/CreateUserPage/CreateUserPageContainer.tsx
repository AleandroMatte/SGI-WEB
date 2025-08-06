import React, { useState, type FormEvent } from "react";
import CreateUserPage from "./CreateUserPage";
import { backApi } from "../../services/api";
export type UserDataInterface = {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  password?: string;
  position?: string;
  birth_date?: string;
  departament_id?: string;
  profile_picture?: { url: string; filename: string; file: Blob | MediaSource };
};
export default function CreateUserPageContainer() {
  const [userData, setUserData] = useState<UserDataInterface>({});

  function handleUserDataUpdates(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setUserData({
        ...userData,
        profile_picture: {
          file: file,
          url: URL.createObjectURL(file),
          filename: file.name,
        },
      });
      return;
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handlePostUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", String(userData.first_name));
    formData.append("last_name", String(userData.last_name));
    formData.append("email", String(userData.email));
    formData.append("username", String(userData.username));
    formData.append("password", String(userData.password));
    formData.append("position", String(userData.position));
    formData.append("birth_date", String(userData.birth_date));
    formData.append("departament_id", String(userData.departament_id));
    formData.append(
      "profile_picture",
      await fetch(userData.profile_picture!.url).then((r) => r.blob()),
      userData.profile_picture?.filename
    );
    await backApi.post("/security/users/", formData);
  }
  return (
    <CreateUserPage
      userData={userData}
      handleUserDataChange={handleUserDataUpdates}
      handleSubmit={handlePostUser}
    />
  );
}
