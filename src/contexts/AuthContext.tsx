"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType } from '@/lib/interfaces';

// Create the authentication context with undefined as initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the application and provides authentication context
 * @param children - Child components that will have access to the auth context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // State for tracking authentication status, loading state, and errors
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setStoredApiKey] = useState<string | null>(null);

  /**
   * Checks the current authentication status by making an API call
   */
  const checkAuthStatus = async () => {
    setIsLoading(true);
    setStoredApiKey(null);
    setIsLoading(false);
  };

  /**
   * Sets the API key by making a POST request and updates authentication state
   * @param apiKey - The API key to be set
   */
  const setApiKey = async (apiKey: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/set-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to set API key');
      }
      setIsAuthenticated(true);
      setStoredApiKey(apiKey);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        apiKey,
        setApiKey,
        checkAuthStatus,
        setIsAuthenticated,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the authentication context
 * @throws {Error} If used outside of AuthProvider
 * @returns {AuthContextType} The authentication context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 