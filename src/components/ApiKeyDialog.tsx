"use client";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { WetroButton } from '@/components/ui/wetro-button';
import { useApiClient } from '@/hooks/useApiClient';

interface ApiKeyDialogProps {
  isOpen: boolean;
  onAuthenticated: () => void;
  isEditing?: boolean;
  currentApiKey?: string;
}

export function ApiKeyDialog({ isOpen, onAuthenticated, isEditing = false, currentApiKey = '' }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { fetchWithAuth } = useApiClient();

  const isValidFormat = apiKey.startsWith('wtc-');
  const isValidLength = apiKey.length === 47;

  // Update apiKey state when currentApiKey prop changes
  useEffect(() => {
    setApiKey(currentApiKey);
  }, [currentApiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidFormat) {
      setError('API key must start with "wtc-"');
      return;
    }
    if (!isValidLength) {
      setError('API key must be exactly 47 characters long');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await fetchWithAuth('/api/set-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      if (!isEditing) {
        window.location.reload();
      }
      onAuthenticated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isEditing ? () => onAuthenticated() : () => {}} modal={true}>
      <DialogContent className="sm:max-w-md">
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
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
            />
            {error && (
              <div className="tracking-tighter"style={{ color: 'red', fontSize: '0.95em' }}>{error}</div>
            )}
          </div>
          <WetroButton
            type="submit"
            isLoading={isLoading}
            disabled={!apiKey || isLoading || !isValidFormat || !isValidLength}
            className="tracking-tight w-full"
          >
            {isEditing ? 'Update' : 'Submit'}
          </WetroButton>

        </form>
      </DialogContent>
    </Dialog>
  );
} 