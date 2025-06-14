"use client";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApiClient } from '@/hooks/useApiClient';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { WetroButton } from './ui/wetro-button';
import { Input } from './ui/input';

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
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent | null, apiKeyValueFromServer: string | null = null) => {
    e?.preventDefault();

    const currentApiKey : string = apiKeyValue || apiKeyValueFromServer || '';
    try {
      const response = await fetchWithAuth('/api/set-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: currentApiKey }),
      });

      if (!response.success) {
        setErrorMessage('API key is not valid');
      }

      setApiKey(currentApiKey);
      setIsAuthenticated(true);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    const fetchAndSetApiKey = async () => {
      try {
        setIsLoading(true);
        const apiKey = await getAPIKey();
        setApiKeyValue(apiKey);

        if (!isMounted) return;
        await handleSubmit(null, apiKey);
      } catch (err: any) {
        if (isMounted) {
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
      <DialogContent className="sm:max-w-md items-center justify-center">
        {(isLoading && !error) && (
          <div className="flex items-center justify-center space-x-2">
            <span className="tracking-tight">Please wait...</span>
          </div>
        )}
        
        {error && (
          <>
            <DialogHeader>
              <DialogTitle className="tracking-tight">
                {isEditing ? 'Edit your Wetrocloud API Key' : 'Enter your Wetrocloud API Key'}
              </DialogTitle>
              <DialogDescription className="tracking-tight">
                {isEditing ? 'Update your API Key' : 'Get your API Key from the'} 
                {!isEditing && <a href="https://console.wetrocloud.com" target="_blank" rel="noopener noreferrer" className="underline"> Wetrocloud console</a>}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="wtc-..."
                  value={apiKeyValue}
                  onClick={() => setErrorMessage('')}
                  onChange={(e) => setApiKeyValue(e.target.value)}
                  disabled={isLoading}
                />
                <div className="tracking-tighter"style={{ color: 'red', fontSize: '0.95em' }}>{errorMessage}</div>
              </div>
              <WetroButton
                type="submit"
                isLoading={isLoading}
                disabled={!apiKeyValue || isLoading}
                className="tracking-tight w-full"
              >
                {isEditing ? 'Update' : 'Submit'}
              </WetroButton>

            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}