import "./App.css";
import UserListPageContainer from "./pages/UserListPage/UserListPageContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserListPageContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
