/**
 * Utility functions for generating user-specific data
 */

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85929E', '#A569BD'
];

const NAMES = [
  'Brilliant', 'Vibrant', 'Serene', 'Dynamic', 'Radiant', 'Graceful', 'Swift',
  'Mighty', 'Noble', 'Wise', 'Brave', 'Gentle', 'Fierce', 'Calm', 'Bright',
  'Clever', 'Daring', 'Elegant', 'Free', 'Grand', 'Honest', 'Kind', 'Lively',
  'Merry', 'Nimble', 'Pure', 'Quick', 'Royal', 'Sharp', 'True', 'Warm', 'Zen'
];
// End of Selection

/**
 * Generates a simple hash from a string
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generates a random color based on the API key
 */
export function getUserColor(apiKey: string): string {
  const hash = simpleHash(apiKey);
  return COLORS[hash % COLORS.length];
}

/**
 * Generates a random name based on the API key
 */
export function getUserName(apiKey: string): string {
  const name = localStorage.getItem('createdByUsername') || '';
  return name;
}

/**
 * Gets user avatar data (color and name) based on API key
 */
export function getUserAvatar(apiKey: string): { color: string; name: string; initials: string } {
  const color = getUserColor(apiKey);
  const name = getUserName(apiKey);
  const initials = name.charAt(0).toUpperCase();
  
  return { color, name, initials };
} 