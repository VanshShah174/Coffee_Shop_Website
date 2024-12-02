import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import AuthService from '../api/authService';

// Define the context's shape for TypeScript
interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: { name: string } | null;
  login: (username: string, password: string) => Promise<{ success: boolean; isAdmin: boolean; name: string }>;
  logout: () => void;
}

// Initialize the context with default values
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter(); // Use router for redirection

  useEffect(() => {
    const checkAuth = async () => {
      const token = AuthService.getToken();
      if (token) {
        const decodedUser = AuthService.decodeToken(token);

        if (decodedUser) {
          setIsAuthenticated(true);
          setIsAdmin(!!decodedUser.isAdmin); // Safely handle `isAdmin` if it's undefined
          setUser({ name: decodedUser.name || 'Unknown' }); // Provide a fallback for the name
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);
    if (response.success) {
      setIsAuthenticated(true);
      setIsAdmin(response.isAdmin);
      setUser({ name: response.name });

      // Set cookies for server-side validation
    document.cookie = `token=${AuthService.getToken()}; path=/`;
    document.cookie = `isAdmin=${response.isAdmin}; path=/`;

      // Redirect based on admin status
      if (response.isAdmin) {
        router.push('/admin'); // Redirect to admin page
      } else {
        router.push('/'); // Redirect to home page
      }
    } else {
      throw new Error(response.message || 'Login failed');
    }
    return response;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
