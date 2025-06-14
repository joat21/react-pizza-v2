import type { CheckoutFormData } from '@modules/Checkout/components/Checkout';
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
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

export const useCreateOrderMutation = (
  options?: Partial<UseMutationOptions<any, Error, CheckoutFormData>>
) =>
  useMutation({
    mutationFn: (orderInfo) => api.post('/order', orderInfo),
    ...options,
  });
