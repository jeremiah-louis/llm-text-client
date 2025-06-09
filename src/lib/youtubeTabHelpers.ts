/**
 * Helper function to extract video ID from YouTube URL
 */
export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  try {
    // Handle youtu.be URLs
    const shortUrlMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortUrlMatch && shortUrlMatch[1]) return shortUrlMatch[1];

    // Handle youtube.com URLs
    let urlObj: URL;
    try {
      // Add protocol if missing to make URL parsing work
      const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
      urlObj = new URL(urlWithProtocol);
    } catch (e) {
      return null; // Invalid URL format
    }
    
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1); // Remove leading slash
    }
    
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      return urlObj.searchParams.get('v');
    }
  } catch (e) {
    console.error('Error extracting video ID:', e);
    return null;
  }
  
  return null;
}

/**
 * Validates if the provided URL is a valid YouTube URL
 */
export function isValidYoutubeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  try {
    // Check if we can extract a video ID
    const videoId = extractVideoId(url);
    if (!videoId) return false;
    
    // Additional check to ensure the video ID format is valid
    return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
  } catch (e) {
    console.error('Error validating YouTube URL:', e);
    return false;
  }
}

/**
 * Fetches transcript from the YouTube API
 */
export async function fetchYoutubeTranscript(url: string) {
  if (!isValidYoutubeUrl(url)) {
    throw new Error('Please enter a valid YouTube URL');
  }

  const response = await fetch('/api/youtube-transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transcript');
  }

  const data = await response.json();
  return JSON.stringify(data?.transcript?.response?.data) || '';
}
