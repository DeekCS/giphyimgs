import axios from 'axios';

const API_KEY = '9Y8pgdIcBQsIhgOGM8bwfH7C0i4H5wNs';

const api = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingGifs = async ({page = 0}) => {
  try {
    const response = await api.get('/trending', {
      params: {
        limit: 20,
        offset: page,
      },
    });

    const {data, pagination} = response.data;

    return {
      data,
      total: pagination.total_count, // Total number of GIFs
      count: pagination.count,       // GIFs in the current response
    };
  } catch (error) {
    throw new Error('Error fetching trending GIFs');
  }
};
export const searchGifs = async (
  query: string,
  limit: number = 20,
  offset: number = 0,
) => {
  const response = await api.get('/search', {
    params: {
      q: query,
      limit,
      offset,
    },
  });
  return response.data.data;
};
