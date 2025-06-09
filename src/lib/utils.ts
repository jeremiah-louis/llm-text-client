import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Generate a random collection ID
export function generateCollectionId(): string {
  return `col_${Math.random().toString(36).substring(2, 15)}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
