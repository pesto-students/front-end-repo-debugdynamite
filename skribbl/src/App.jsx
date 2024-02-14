import AppRoutes from "./AppRoutes";
import { UserContextProvider } from "./context/UserContext";
import { SocketContextProvider } from "./context/SocketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosInterceptor } from "./api/axios";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SocketContextProvider>
          <AxiosInterceptor>
            <AppRoutes />
          </AxiosInterceptor>
        </SocketContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
