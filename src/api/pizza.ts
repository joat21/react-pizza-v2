import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from 'api';
import type { Pizza, PizzaFilters } from 'types';

export const getPizzas = async (filters: PizzaFilters): Promise<Pizza[]> => {
  const params = new URLSearchParams();

  if (filters.categoryId) params.append('categoryId', filters.categoryId);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);

  const { data } = await api.get('/pizza?' + params.toString());
  return data;
};

export const usePizzaQuery = (
  filters: PizzaFilters,
  options?: Partial<UseQueryOptions<Pizza[]>>
) =>
  useQuery({
    queryKey: ['pizzas', filters],
    queryFn: () => getPizzas(filters),
    ...options,
  });

export const usePizzaByIdQuery = (
  id: string,
  options?: Partial<UseQueryOptions<Pizza>>
) =>
  useQuery({
    queryKey: ['pizza', id],
    queryFn: async () => {
      const { data } = await api.get('/pizza/' + id);
      return data;
    },
    ...options,
  });

export const useRecommendedPizzaQuery = (
  categoryId?: string,
  options?: UseQueryOptions<Pizza[]>
) =>
  useQuery<Pizza[]>({
    queryKey: ['recommended-pizzas', categoryId],
    queryFn: async () => {
      const { data } = await api.get('/pizza?categoryId=' + categoryId);
      return data;
    },
    enabled: !!categoryId,
    ...options,
  });
