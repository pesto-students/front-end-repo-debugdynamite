import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
