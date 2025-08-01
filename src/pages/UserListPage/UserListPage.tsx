import AgTable from "../../components/Table";

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
};

interface UserListPageProps {
  data: UserData[];
}

export default function UserListPage({ data }: UserListPageProps) {
  return (
    <div className="size-[1000px]">
      <AgTable
        rowData={data}
        columnDefinition={[
          { field: "first_name" },
          { field: "last_name" },
          { field: "email" },
        ]}
      ></AgTable>
    </div>
  );
}
