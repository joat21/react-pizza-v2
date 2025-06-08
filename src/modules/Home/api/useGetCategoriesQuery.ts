import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { api } from 'api/axios';
import type { Category } from 'types';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories');
  return data;
};

export const useGetCategoriesQuery = (
  options?: UseQueryOptions<Category[]>
): UseQueryResult<Category[]> =>
  useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    ...options,
  });
