import axios, { AxiosError } from 'axios';

export const analyzeUrl = async (url: string) => {
  try {
    const response = await axios.post('/api/analyze', { url });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error('API endpoint not found. Make sure your backend server is running.');
      }
      throw new Error(error.response?.data?.error || error.message);
    }
    console.error('Error analyzing URL:', error);
    throw error;
  }
}