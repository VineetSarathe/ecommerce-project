import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <p className="text-center p-10 text-gray-600">
        Loading...
      </p>
    );

  if (!user) return <Navigate to="/admin/login" />;

  return user.role === "admin"
    ? children
    : <Navigate to="/" />;
};

export default AdminRoute;
