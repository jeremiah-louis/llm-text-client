import { useAuth } from '@/hooks/useAuth';

/**
 * useApiClient hook provides fetchWithAuth for API requests with 401 handling
 */
export function useApiClient() {
    const { checkAuthStatus } = useAuth();
  
    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
      const response = await fetch(url, options);
  
      if (response.status === 401) {
        // Trigger re-authentication flow
        await checkAuthStatus();
        throw new Error('Authentication required');
      }
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Request failed');
      }
  
      return response.json();
    };
  
    return { fetchWithAuth };
  }