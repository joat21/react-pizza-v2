import { type UseMutationOptions } from '@tanstack/react-query';

import { api } from 'api';
import { useOptimisticMutation } from 'hooks/useOptimisticMutation';

import type { CartItem } from 'types';

const queryKey = ['cart'];

export const useAddToCartMutation = (
  options?: Partial<
    UseMutationOptions<
      CartItem[],
      Error,
      CartItem,
      { previousData: CartItem[] | undefined }
    >
  >
) =>
  useOptimisticMutation({
    queryKey,
    mutationFn: (item) =>
      api.post('/cart', { pizzaVariantId: item.pizzaVariantId }),
    updater: (data, item) => [...data, item],
    ...options,
  });

export const useUpdateCartItemMutation = (
  options?: Partial<
    UseMutationOptions<
      CartItem[],
      Error,
      { id: string; amount: number },
      { previousData: CartItem[] | undefined }
    >
  >
) =>
  useOptimisticMutation({
    queryKey,
    mutationFn: (cartItem) => api.patch('/cart/' + cartItem.id, cartItem),
    updater: (data, cartItem) =>
      data.map((item) =>
        item.id === cartItem.id ? { ...item, amount: cartItem.amount } : item
      ),
    ...options,
  });

export const useDeleteCartItemMutation = (
  options?: Partial<
    UseMutationOptions<
      CartItem[],
      Error,
      string,
      { previousData: CartItem[] | undefined }
    >
  >
) =>
  useOptimisticMutation({
    queryKey,
    mutationFn: (itemId) => api.delete('/cart/' + itemId),
    updater: (data, itemId) => data.filter((item) => item.id !== itemId),
    ...options,
  });

export const useClearCartMutation = (
  options?: Partial<
    UseMutationOptions<
      any,
      Error,
      void,
      { previousData: CartItem[] | undefined }
    >
  >
) =>
  useOptimisticMutation({
    queryKey,
    mutationFn: () => api.delete('/cart'),
    updater: () => [],
    ...options,
  });
