import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosInterceptor } from "./api/axios";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AxiosInterceptor>
          <AppRoutes />
        </AxiosInterceptor>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
