/**
 * Interface defining the shape of the authentication context
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setApiKey: (apiKey: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  error: string | null;
} 