/**
 * Interface defining the shape of the authentication context
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  apiKey: string | null;
  setApiKey: (apiKey: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  error: string | null;
} 