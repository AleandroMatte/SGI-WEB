import "./App.css";
import "leaflet/dist/leaflet.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AssetsViewContainer from "./pages/AssetsViewPage/AssetsViewContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AssetsViewContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
