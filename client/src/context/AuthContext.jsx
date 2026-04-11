import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getMe } from '../services/authService.js';

export const AuthContext = createContext(null);

const SESSION_KEY = 'bbx_session';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      let localSession = null;
      try {
        const localSessionRaw = localStorage.getItem(SESSION_KEY);
        localSession = localSessionRaw ? JSON.parse(localSessionRaw) : null;
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }

      if (token || localSession?.token) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          Cookies.remove('token');
          localStorage.removeItem(SESSION_KEY);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, userData) => {
    Cookies.set('token', token, { expires: 7 });
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ token, user: userData })
    );
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
