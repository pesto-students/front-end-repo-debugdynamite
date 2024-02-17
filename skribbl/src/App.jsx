import AppRoutes from "./AppRoutes";
import { UserContextProvider } from "./context/UserContext";
import { SocketContextProvider } from "./context/SocketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosInterceptor } from "./api/axios";
import { GameContextProvider } from "./context/GameContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SocketContextProvider>
          <GameContextProvider>
            <AxiosInterceptor>
              <AppRoutes />
            </AxiosInterceptor>
          </GameContextProvider>
        </SocketContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
