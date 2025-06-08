import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { api } from 'api/axios';
import type { Pizza } from 'types';

export const getPizzas = async (): Promise<Pizza[]> => {
  const { data } = await api.get('/pizza');
  return data;
};

export const useGetPizzasQuery = (
  options?: UseQueryOptions<Pizza[]>
): UseQueryResult<Pizza[]> =>
  useQuery<Pizza[]>({
    queryKey: ['pizzas'],
    queryFn: getPizzas,
    ...options,
  });
