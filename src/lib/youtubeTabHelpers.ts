/**
 * Helper function to extract video ID from YouTube URL
 */
function extractVideoId(url: string): string | null {
  // Handle youtu.be URLs
  const shortUrlMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortUrlMatch) return shortUrlMatch[1];

  // Handle youtube.com URLs
  const urlObj = new URL(url);
  if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
    return urlObj.searchParams.get('v');
  }
  
  return null;
}

/**
 * Validates if the provided URL is a valid YouTube URL
 */
export function isValidYoutubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[^&]+/,
    /^https?:\/\/youtu\.be\/[^?&]+/,
  ];
  
  return patterns.some(pattern => pattern.test(url));
}

/**
 * Fetches transcript from the YouTube API endpoint
 */
export async function fetchYoutubeTranscript(
  url: string,
  setError: (error: string | null) => void,
  setIsLoading: (loading: boolean) => void,
  setTranscript: (transcript: string) => void
) {
  if (!isValidYoutubeUrl(url)) {
    setError('Please enter a valid YouTube URL');
    return;
  }

  setError(null);
  setIsLoading(true);

  try {
    const response = await fetch('/api/youtube-transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch transcript');
    }

    const data = await response.json();
    
    // Extract the text from the transcript data
    const transcriptText = data.data.response.data || 'No transcript available';
    setTranscript(JSON.stringify(transcriptText));
  } catch (error) {
    console.error('Error fetching transcript:', error);
    setError(
      error instanceof Error 
        ? error.message 
        : 'An error occurred while fetching the transcript'
    );
  } finally {
    setIsLoading(false);
  }
}
