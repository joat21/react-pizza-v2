import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { api } from 'api/axios';
import type { Pizza } from 'types';

export const getPizzaById = async (id: string): Promise<Pizza> => {
  const { data } = await api.get('/pizza/' + id);
  return data;
};

export const useGetPizzaByIdQuery = (
  id: string,
  options?: UseQueryOptions<Pizza>
): UseQueryResult<Pizza> =>
  useQuery<Pizza>({
    queryKey: ['pizza', id],
    queryFn: () => getPizzaById(id),
    ...options,
  });
