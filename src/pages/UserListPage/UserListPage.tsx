import AgTable from "../../components/Table";
import { BiSolidUser } from "react-icons/bi";

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  profile_picture?: string;
};
const ImageCellRenderer = (props: { value: string }) => {
  return (
    <div className="flex justify-center items-center border outline-2content-normal rounded-full size-6 object-fill overflow-auto m-[2px]">
      {props.value ? (
        <img src={props.value} className="w-full h-full object-cover" />
      ) : (
        <BiSolidUser />
      )}
    </div>
  );
};
const DateCellRenderer = (props: { value: string }) => {
  return new Date(props.value).toLocaleDateString();
};

interface UserListPageProps {
  data: UserData[];
}

export default function UserListPage({ data }: UserListPageProps) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="w-[80vw] h-10 flex flex-row justify-end m-[10px]">
        <button className="w-50 h-10 cursor-pointer bg-sgiBlack hover:bg-sgiHoverBlack rounded-xl shadow-xl/10 text-white self-center">
          Criar usuário
        </button>
      </div>
      <div className="size-[80vw]">
        <AgTable
          rowData={data}
          columnDefinition={[
            {
              field: "profile_picture",
              headerName: "",
              cellRenderer: ImageCellRenderer,
              cellStyle: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
            { field: "first_name", headerName: "Nome" },
            { field: "last_name", headerName: "Sobrenome" },
            { field: "email", eaderName: "Email" },
            { field: "position", headerName: "Cargo" },
            {
              field: "birth_date",
              headerName: "Data de Nascimento",
              cellRenderer: DateCellRenderer,
            },
          ]}
        ></AgTable>
      </div>
    </div>
  );
}
