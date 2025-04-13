import axios from 'axios';

const api = axios.create({
  baseURL: 'https://llms-txt-server.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function generateMarkdown(url: string): Promise<string> {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    const { data } = await api.post('/generate-md', { url });

    if (!data || !data.markdown) {
      throw new Error('Invalid response from server');
    }
    console.log(data.markdown);
    return data.markdown;
  } catch (error) {
    console.error('Error generating markdown:', error);
    
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      if (error.response) {
        // The server responded with a status code outside of 2xx
        const message = error.response.data?.message || error.message;
        throw new Error(`Server error: ${message}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(`Request failed: ${error.message}`);
      }
    }

    // Handle non-Axios errors
    throw new Error('Failed to generate markdown. Please try again. ');
  }
}

generateMarkdown('https://ucarecdn.com/cf5d9bf1-e114-4f8d-bef0-d272dbccea51/COMP3023102Cloudadoption1.pptx');