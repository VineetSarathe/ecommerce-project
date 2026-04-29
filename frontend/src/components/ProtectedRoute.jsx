import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
