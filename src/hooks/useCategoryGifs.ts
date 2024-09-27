import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchGifsByCategory } from '../services/GiphyService';

export const useCategoryGifs = (page: number, category: string) => {
  return useQuery({
    queryKey: ['gifs', category, page],
    queryFn: () => fetchGifsByCategory({ page, category }),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};