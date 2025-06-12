"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/Avatar";

export default function Header() {
  const { isAuthenticated, apiKey } = useAuth();
  return (
    <header className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link 
          href="https://wetrocloud.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="relative w-8 h-8">
            <Image
              src="/Logo-wetrocloud.svg"
              alt="Wetrocloud"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400">
            Wetrocloud
          </span>
        </Link>
        
        {isAuthenticated && apiKey && (
          <Avatar apiKey={apiKey} />
        )}
      </div>
    </header>
  );
}