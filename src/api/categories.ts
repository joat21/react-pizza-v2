import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from 'api';
import type { Category } from 'types';

export const useCategoriesQuery = (
  options?: Partial<UseQueryOptions<Category[]>>
) =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
    ...options,
  });
