import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {fetchTrendingGifs} from '../services/GiphyService';

export const useTrendingGifs = (page: number) => {
  return useQuery({
    queryKey: ['trending', page],
    queryFn: () => fetchTrendingGifs({page}),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
