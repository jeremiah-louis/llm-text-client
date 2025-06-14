"use client";
import { useState } from 'react';
import { getUserAvatar } from '@/lib/userUtils';
import { ApiKeyDialog } from '@/components/ApiKeyDialog';
import Link from 'next/link';

const CONSOLE_URL = process.env.NEXT_PUBLIC_CONSOLE_DASHBOARD_URL;
interface AvatarProps {
  apiKey: string;
  className?: string;
}

export function Avatar({ apiKey, className = '' }: AvatarProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { color, name, initials } = getUserAvatar(apiKey);

  const handleEditComplete = () => {
    setIsEditDialogOpen(false);
    // Refresh the page to update the avatar with new API key
    window.location.reload();
  };

  return (
    <>
      <div className={`flex items-center space-x-3 ${className}`}>
        <Link
          href={`${CONSOLE_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all"
          style={{ backgroundColor: color }}
          title={`${name} - Click to open Console`}
        >
          {initials}
        </Link>
        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
      </div>

      <ApiKeyDialog
        isOpen={isEditDialogOpen}
        onAuthenticated={handleEditComplete}
        isEditing={true}
        currentApiKey={apiKey}
      />
    </>
  );
} 