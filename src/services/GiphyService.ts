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
      total: pagination.total_count,
      count: pagination.count,
    };
  } catch (error) {
    throw new Error('Error fetching trending GIFs');
  }
};

export const fetchGifsByCategory = async ({
  page = 0,
  category = 'trending',
}) => {
  try {
    const endpoint =
      category === 'trending' ? '/trending' : `/search?q=${category}`;

    const response = await api.get(endpoint, {
      params: {
        limit: 20,
        offset: page,
      },
    });

    const {data, pagination} = response.data;

    return {
      data,
      total: pagination.total_count,
      count: pagination.count,
    };
  } catch (error) {
    throw new Error('Error fetching GIFs');
  }
};

export const searchGifs = async (
  query: string,
  limit: number = 20,
  offset: number = 0,
  signal?: AbortSignal, 
) => {
  const response = await api.get('/search', {
    params: {
      q: query,
      limit,
      offset,
    },
    signal, 
  });
  return response.data.data;
};
