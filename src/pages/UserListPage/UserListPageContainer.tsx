import { useQuery } from "@tanstack/react-query";
import { backApi } from "../../services/api";
import UserListPage from "./UserListPage";

export default function UserListPageContainer() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => backApi.get("/security/users/"),
  });

  return <UserListPage data={query.data?.data} />;
}
