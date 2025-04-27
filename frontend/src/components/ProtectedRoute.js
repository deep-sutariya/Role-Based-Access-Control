import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contex/authContex';

// To protect admin page from users
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user.token) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
