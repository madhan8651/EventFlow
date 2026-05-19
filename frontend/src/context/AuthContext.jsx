import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('eventflow_user') || 'null'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('eventflow_token');
    if (!token) return;
    api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => logout(false));
  }, []);

  const persistSession = (data) => {
    localStorage.setItem('eventflow_token', data.token);
    localStorage.setItem('eventflow_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (form) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      persistSession(data);
      toast.success(`Welcome back, ${data.user.name}`);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      persistSession(data);
      toast.success('Account created successfully');
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = (notify = true) => {
    localStorage.removeItem('eventflow_token');
    localStorage.removeItem('eventflow_user');
    setUser(null);
    if (notify) toast.success('Logged out');
  };

  const value = useMemo(() => ({ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
