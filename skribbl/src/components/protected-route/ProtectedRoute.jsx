import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  if (!user) {
    navigate("/sign-in");
    return;
  }

  return <Outlet />;
};

export default ProtectedRoute;
