import axios from 'axios';

export async function generateMarkdown(link: string): Promise<string> {
  if (!link) {
    throw new Error('Link is required');
  }

  try {
    const { data } = await axios.post('/api/generate-md', { link });

    if (!data.markdown) {
      throw new Error('Invalid response from server');
    }
    
    return data.markdown;
  } catch (error) {
    console.error('Error generating markdown:', error);
    
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      if (error.response) {
        // The server responded with a status code outside of 2xx
        const message = error.response.data?.error || error.message;
        throw new Error(message);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(`Request failed: ${error.message}`);
      }
    }

    // Handle non-Axios errors
    throw new Error('Failed to generate markdown. Please try again.');
  }
}