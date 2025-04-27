import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ token: null, role: null, name:null });
  const [loading, setLoading] = useState(true);

  //on load, check for token and fetch user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser({ token, role: res.data.role, name: res.data.name });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser({ token: null, role: null });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, role, name) => {
    localStorage.setItem('token', token);
    setUser({ token, role, name });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
