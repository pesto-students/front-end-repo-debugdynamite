import AppRoutes from "./AppRoutes";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosInterceptor } from "./api/axios";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <AxiosInterceptor>
          <AppRoutes />
        </AxiosInterceptor>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
