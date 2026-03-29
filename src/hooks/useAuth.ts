// hooks/useAuth.ts - Custom hook for authentication state management

import { useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  getAccessToken,
  storeTokens,
  type LoginCredentials,
  type RegisterData,
  type UserProfile,
} from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const userData = await getCurrentUser(token);
          setUser(userData);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const tokens = await apiLogin(credentials);
      storeTokens(tokens);
      
      const userData = await getCurrentUser(tokens.access_token);
      setUser(userData);
      
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      await apiRegister(data);
      
      // Auto-login after registration
      const loginResult = await login({
        email: data.email,
        password: data.password,
      });
      
      return loginResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}

// Usage example:
// 
// function MyComponent() {
//   const { user, login, logout, isAuthenticated, loading } = useAuth();
//
//   const handleLogin = async () => {
//     const result = await login({ email: "test@test.com", password: "password" });
//     if (result.success) {
//       // Redirect or show success
//     }
//   };
//
//   return <div>...</div>;
// }