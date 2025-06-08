import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { api } from 'api/axios';
import type { Pizza, PizzaFilters } from 'types';

export const getPizzas = async (filters: PizzaFilters): Promise<Pizza[]> => {
  const params = new URLSearchParams();

  if (filters.categoryId) params.append('categoryId', filters.categoryId);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);

  const { data } = await api.get('/pizza?' + params.toString());
  return data;
};

export const useGetPizzasQuery = (
  filters: PizzaFilters,
  options?: UseQueryOptions<Pizza[]>
): UseQueryResult<Pizza[]> =>
  useQuery<Pizza[]>({
    queryKey: ['pizzas', filters],
    queryFn: () => getPizzas(filters),
    ...options,
  });
