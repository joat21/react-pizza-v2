import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from 'api';
import type { CartItem } from 'types';

export const useCartQuery = (
  options?: Partial<
    UseQueryOptions<
      CartItem[],
      Error,
      { items: CartItem[]; totalCount: number; totalPrice: number }
    >
  >
) =>
  useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get('/cart');
      return data;
    },
    select(data) {
      const totalCount = data.reduce((sum, item) => sum + item.amount, 0);
      const totalPrice = data.reduce((sum, item) => sum + item.price, 0);

      return {
        items: data,
        totalCount,
        totalPrice,
      };
    },
    ...options,
  });
