import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useRef} from 'react';
import {searchGifs} from '../services/GiphyService';

export const useSearchGifs = (query: string, page: number) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  return useQuery({
    queryKey: ['searchGifs', query, page],
    queryFn: async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        return await searchGifs(query, 20, page, signal);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        } else if (error instanceof Error) {
          // Handle other errors (network errors, etc.)
          console.error('Error fetching GIFs:', error.message);
          throw error; // Re-throw error to let react-query handle it
        } else {
          console.error('An unknown error occurred:', error);
          throw new Error('An unknown error occurred.');
        }
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
