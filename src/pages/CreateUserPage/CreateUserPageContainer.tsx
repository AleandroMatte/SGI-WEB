import React, { useState, type FormEvent } from "react";
import CreateUserPage from "./CreateUserPage";
import { backApi } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
export type UserDataInterface = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  position: string;
  birth_date: string;
  groups: number;
  profile_picture?: { url: string; filename: string; file: Blob | MediaSource };
};
export type UserGroupsData = {
  id: number;
  name: string;
};

export default function CreateUserPageContainer() {
  const userGroupQuery = useQuery({
    queryKey: ["groupQuery"],
    queryFn: () => backApi.get<UserGroupsData[]>("/security/groups/"),
  });
  const [userData, setUserData] = useState<UserDataInterface>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    position: "",
    birth_date: "",
    groups: 0,
  });

  function handleUserDataUpdates(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    e.preventDefault();
    const file = (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];
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
    console.log(e.target.value);
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
    formData.append("groups", String(Array(userData.groups)));
    if (userData.profile_picture) {
      formData.append(
        "profile_picture",
        await fetch(userData.profile_picture!.url).then((r) => r.blob()),
        userData.profile_picture?.filename
      );
    }
    await backApi
      .post("/security/users/", formData)
      .then(() => {
        setUserData({
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
          position: "",
          birth_date: "",
          groups: 0,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <CreateUserPage
      userData={userData}
      handleUserDataChange={handleUserDataUpdates}
      handleSubmit={handlePostUser}
      groupsData={userGroupQuery.data?.data}
    />
  );
}
