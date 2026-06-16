import {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

import toast from 'react-hot-toast';

import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'eventflow_user'
        ) || 'null'
      )
    );

  const [loading, setLoading] =
    useState(false);

  const persistSession = (data) => {

    localStorage.setItem(
      'eventflow_token',
      data.token
    );

    localStorage.setItem(
      'eventflow_user',
      JSON.stringify(data.user)
    );

    setUser(data.user);
  };

  const login = async (form) => {

    setLoading(true);

    try {

      const { data } =
        await api.post(
          '/auth/login',
          form
        );

      persistSession(data);

      toast.success(
        `Welcome back, ${data.user.name}`
      );

      return data.user;

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Login failed'
      );

      throw error;

    } finally {

      setLoading(false);
    }
  };

  const register = async (form) => {

    setLoading(true);

    try {

      const { data } =
        await api.post(
          '/auth/register',
          form
        );

      persistSession(data);

      toast.success(
        'Account created successfully'
      );

      return data.user;

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Register failed'
      );

      throw error;

    } finally {

      setLoading(false);
    }
  };

  const logout = () => {

    localStorage.removeItem(
      'eventflow_token'
    );

    localStorage.removeItem(
      'eventflow_user'
    );

    setUser(null);

    toast.success('Logged out');
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);