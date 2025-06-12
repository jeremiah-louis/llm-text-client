import axios from 'axios';


export async function generateMarkdown(link: string): Promise<string> {
  if (!link) {
    throw new Error('Link is required');
  }

  try {
    const { data } = await axios.post('/api/generate-md', { link });

    if (!data.markdown) {
      throw new Error('An error occurred. Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
    }
    
    return data.markdown;
  } catch (error) {
    console.error('Error generating markdown:', error);
    
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      if (error.response) {
        // The server responded with a status code outside of 2xx
        const message = error.response.data?.error || error.message;
        throw new Error('An error occurred. Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Please check your internet connection and try again. If the problem persists, reach out to hello@wetrocloud.com for help');
      } else {
        // Something happened in setting up the request
        throw new Error('An error occurred. Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
      }
    }

    // Handle non-Axios errors
    throw new Error('Failed to generate markdown, Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
  }
}


export async function extractStructuredData(website: string, json_schema: string) {
  if (!website) {
    throw new Error('Website URL is required');
  }

  if (!json_schema) {
    throw new Error('JSON schema is required'); 
  }

  try {
    const { data } = await axios.post('/api/structured-output', {
      website,
      json_schema
    },
  );

    if (!data.data) {
      throw new Error('An error occurred. Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
    }

    return data.data;
  } catch (error) {
    console.error('Error extracting structured data:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const message = error.response.data?.error || error.message;
        throw new Error(message);
      } else if (error.request) {
        throw new Error('Please check your internet connection and try again');
      } else {
        throw new Error('An error occurred. Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
      }
    }

    throw new Error('Failed to extract structured data. Please try again. If the problem persists, reach out to hello@wetrocloud.com for help');
  }
}