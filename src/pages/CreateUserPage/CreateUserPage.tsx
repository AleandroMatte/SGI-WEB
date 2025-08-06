import { BiCamera, BiSolidUser } from "react-icons/bi";
import DefaultInputComponent2 from "../../components/InputComponentV2";
import type { UserDataInterface } from "./CreateUserPageContainer";
import DefaultButton from "../../components/ButtonComponent";
import type React from "react";
import type { FormEvent } from "react";

interface CreateUserPage {
  userData: UserDataInterface;
  handleUserDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}
export default function CreateUserPage({
  userData,
  handleUserDataChange,
  handleSubmit,
}: CreateUserPage) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="shadow-2xl bg-sgiBackGroundOffWhite rounded-2xl p-10 w-[70%]">
        <form onSubmit={handleSubmit} className="flex flex-row justify-center">
          <div className=" min-w-[50%]  flex flex-col items-center bg-sgiBlack text-white p-[15px] rounded-2xl">
            <div className="w-32 h-32 relative flex justify-center items-center overflow-hidden rounded-full border group bg-gray-100">
              {userData.profile_picture ? (
                <img
                  src={userData.profile_picture.url}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <BiSolidUser className="text-black text-5xl" />
              )}

              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <BiCamera className="text-white text-xl" />
                <input
                  name="profile_picture"
                  type="file"
                  onChange={handleUserDataChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex w-full max-w-[400px] flex-col gap-3 p-[10px] overflow-hidden">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Nome: {userData.first_name}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Sobrenome: {userData.last_name}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Email: {userData.email}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Login: {userData.username}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Senha: {userData.password}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Cargo: {userData.position}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                Departamento: {userData.departament_id}
              </p>
            </div>
          </div>
          <div className="w-[10%] flex flex-col  items-center justify-center">
            <div className=" h-[100%] w-[1px] border"></div>
          </div>
          <div className="flex flex-col flex-wrap gap-4 min-w-[40%]">
            <h1 className="self-center">Informações do Usuario</h1>
            <div className=" grid grid-cols-2 gap-5 justify-center">
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="text"
                name="first_name"
                placeholder="Nome"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Nome"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="text"
                name="last_name"
                placeholder="Sobrenome"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Sobrenome"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="email"
                name="email"
                placeholder="Email"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Email"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="text"
                placeholder="Login"
                name="username"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Login"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="password"
                name="password"
                placeholder="Senha"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Senha"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                name="position"
                type="position"
                placeholder="Função"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Cargo"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="number"
                name="departament_id"
                placeholder="Departamento"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Departamento"
              />
              <DefaultInputComponent2
                onChange={handleUserDataChange}
                type="date"
                name="birth_date"
                placeholder="Data de Nascimento"
                className=" w-[100%] h-10 border-[0px] inset-ring"
                label="Data de Nascimento"
              />
              <DefaultButton
                className="h-10 col-span-2"
                label="Criar Usuário"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
