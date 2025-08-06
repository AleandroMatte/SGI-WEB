import "./App.css";
import CreateUserPageContainer from "./pages/CreateUserPage/CreateUserPageContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserListPageContainer from "./pages/UserListPage/UserListPageContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserListPageContainer />
        {/* <CreateUserPageContainer /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
