import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signin(credentials: SignInCredentials): Promise<void>;
  signout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem('@goBarber:token');
      const user = await AsyncStorage.getItem('@goBarber:user');

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
      }

      token && user
        ? setData({ token, user: JSON.parse(user) })
        : setData({} as AuthState);

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signin = useCallback(async ({ email, password }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@goBarber:token', token],
      ['@goBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signout = useCallback(async () => {
    await AsyncStorage.multiRemove(['@goBarber:token', '@goBarber:user']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signin, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!!');
  }

  return context;
}
