"use client";
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ApiKeyDialog } from '@/components/ApiKeyDialog';
import Loading from '@/app/loading';

interface AuthenticationContainerProps {
  children: ReactNode;
}

export function AuthenticationContainer({ children }: AuthenticationContainerProps) {
  const { isAuthenticated, isLoading, setApiKey } = useAuth();

  const handleAuthenticated = async (apiKey: string) => {
    try {
      await setApiKey(apiKey);
    } catch (error) {
      // Error handling is managed by the ApiKeyDialog component
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    {/* Always render the app UI, regardless of auth */}
    <div className={isAuthenticated ? '' : 'blur-sm pointer-events-none'}>
      {children}
    </div>

    {/* Show the modal if not authenticated */}
    <ApiKeyDialog 
      isOpen={!isAuthenticated} 
      onAuthenticated={() => {}} 
    />
  </>
  );
} 