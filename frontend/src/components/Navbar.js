import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contex/authContex';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">MyBlog</Link>
        </div>

        <div className="flex items-center space-x-6">
          {!user.token ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-400">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-white">{`Welcome, ${user.name}`}</span>
              <span className="text-white">{`Role: ${user.role}`}</span>
              
              {user.role === 'admin' && (
                <button
                  onClick={handleGoToAdmin}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                  Admin Page
                </button>
              )}

              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
