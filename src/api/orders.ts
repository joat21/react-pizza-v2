import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from 'api';
import type { Order } from 'types';

export const useOrdersQuery = (options?: Partial<UseQueryOptions<Order[]>>) =>
  useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await api.get('/order');
      return data;
    },
    retry: false,
    ...options,
  });
