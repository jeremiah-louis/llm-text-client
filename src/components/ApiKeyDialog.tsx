"use client";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApiClient } from '@/hooks/useApiClient';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/contexts/AuthContext';

const LOGIN_URL = process.env.NEXT_PUBLIC_CONSOLE_DASHBOARD_URL+'/auth?redirect='+process.env.NEXT_PUBLIC_BASE_URL;

interface ApiKeyDialogProps {
  isOpen: boolean;
  onAuthenticated: () => void;
  isEditing?: boolean;
  currentApiKey?: string;
}

export function ApiKeyDialog({ isOpen, onAuthenticated, isEditing = false, currentApiKey = '' }: ApiKeyDialogProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithAuth } = useApiClient();
  const { getAPIKey } = useDashboard();
  const { setIsAuthenticated, setApiKey } = useAuth();


  useEffect(() => {
    if (!isOpen) return;
    
    let isMounted = true;
    
    const fetchAndSetApiKey = async () => {
      try {
        setIsLoading(true);
        const apiKey = await getAPIKey();
        
        if (!isMounted) return;
        
        const response = await fetchWithAuth('/api/set-api-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey }),
        });
        
        if (!response.success) {
          throw new Error('API key is not valid');
        }
        
        if (isMounted) {
          setApiKey(apiKey);
          setIsAuthenticated(true);
        }
      } catch (err: any) {
        if (isMounted) {
          console.log(err);
          console.log(err.message);
          if(err.status === 401){
            if (typeof window !== 'undefined') {
              window.location.href = LOGIN_URL;
          }
          } else {
            setError(err.message);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchAndSetApiKey();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={isEditing ? () => onAuthenticated() : () => {}}>
      <DialogContent className="sm:max-w-md flex items-center justify-center">
        {(isLoading && !error) && (
          <div className="flex items-center justify-center space-x-2">
            <span className="tracking-tight">Please wait...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center space-x-2">
            <span className="tracking-tight text-red-600">An error occurred</span>
          </div>  
        )}
      </DialogContent>
    </Dialog>
  );
}