import {
  BsBinocularsFill,
  BsGoogle,
  BsLinkedin,
  BsApple,
  BsSlashCircleFill,
} from "react-icons/bs";
import DefaultInput from "../../components/InputComponent";
import React from "react";

interface LoginPageDataProps {
  username: string;
  passwd: string;
  isLoading: boolean;
  handleUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function LoginPage({
  username,
  passwd,
  isLoading,
  handleUserNameChange,
  handlePasswordChange,
  handleFormSubmit,
}: LoginPageDataProps) {
  return (
    <div
      className="bg-[#F3F5F9] w-screen h-screen flex justify-center items-center"
      style={{
        padding: "10px",
      }}
    >
      <div
        className="
        bg-[#FEFEFE] lg:size-[32rem] shadow-xl rounded-2xl flex justify-center items-center flex-col gap-4
        "
        style={{
          padding: "10px",
          backgroundImage:
            "linear-gradient(to bottom, #c2c2c22c 2%, #FEFEFE 100%)",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className="shadow-md border-4 rounded-full"
            style={{
              padding: "10px",
            }}
          >
            <BsBinocularsFill className="size-9" />
          </div>
          <h2>
            <b>Welcome Back</b>
          </h2>
          <p>Por favor, selecione seu método de login</p>
        </div>
        <div className="flex flex-row place-content-evenly gap-10">
          <div className="flex size-[3rem] border shadow-md rounded-lg justify-center items-center">
            <BsGoogle />
          </div>
          <div className="flex size-[3rem] border shadow-md rounded-lg justify-center items-center">
            <BsLinkedin />
          </div>
          <div className="flex size-[3rem] border shadow-md rounded-lg justify-center items-center">
            <BsApple />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-1">
          <div>------------------------</div>
          <p> or </p>
          <div>------------------------</div>
        </div>
        <div className="flex flex-col gap-6 w-[80%]">
          <DefaultInput
            value={username}
            label="Nome de Usuário:"
            type="text"
            placeholderText="username"
            onChangeHandler={handleUserNameChange}
          />
          <div className="flex flex-col">
            <DefaultInput
              value={passwd}
              label="Senha:"
              type="password"
              placeholderText="senha"
              onChangeHandler={handlePasswordChange}
            />
            <a
              className="self-end"
              style={{ textDecoration: "underline" }}
              href="url"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>
        <button className="bg-red-500 text-white p-4 rounded">
          Test Button
        </button>
        <button
          onClick={handleFormSubmit}
          className={
            "w-80 h-10 cursor-pointer bg-black flex items-center justify-center text-center"
          }
          type="submit"
          aria-busy={isLoading}
        >
          {isLoading ? <BsSlashCircleFill /> : "Logar"}
        </button>
      </div>
    </div>
  );
}
