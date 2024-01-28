import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { SIGN_IN_ROUTE } from "../../constants/routes";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  if (!user) {
    navigate(SIGN_IN_ROUTE);
    return;
  }

  return <Outlet />;
};

export default ProtectedRoute;
