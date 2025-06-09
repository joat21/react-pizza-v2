import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { api } from 'api/axios';
import type { Pizza } from 'types';

export const getPizzas = async (categoryId?: string): Promise<Pizza[]> => {
  const { data } = await api.get('/pizza?categoryId=' + categoryId);
  return data;
};

export const useGetRecommendedPizza = (
  categoryId?: string,
  options?: UseQueryOptions<Pizza[]>
): UseQueryResult<Pizza[]> =>
  useQuery<Pizza[]>({
    queryKey: ['recommended-pizzas', categoryId],
    queryFn: () => getPizzas(categoryId),
    enabled: !!categoryId,
    ...options,
  });
