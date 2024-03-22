import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   const navigate = useNavigate();
   if (!currentUser?.data?._id && !loadingCurrentUser) return navigate("/");
   return children;
}

export default ProtectedRoute;
