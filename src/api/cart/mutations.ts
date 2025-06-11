import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { api, queryClient } from 'api';
import { optimisticUpdate } from 'helpers/optimisticUpdate';
import type { CartItem } from 'types';

const queryKey = ['cart'];

export const useAddToCartMutation = (
  options?: Partial<
    UseMutationOptions<CartItem, Error, CartItem, { previousData?: CartItem[] }>
  >
) =>
  useMutation({
    mutationFn: (item) =>
      api.post('/cart', { pizzaVariantId: item.pizzaVariantId }),
    onMutate: async (item) =>
      optimisticUpdate<CartItem[]>(queryKey, (data) => [...data, item]),
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });

export const useUpdateCartItemMutation = (
  options?: Partial<
    UseMutationOptions<
      CartItem,
      Error,
      { id: string; amount: number },
      { previousData?: CartItem[] }
    >
  >
) =>
  useMutation({
    mutationFn: (cartItem) => api.patch('/cart/' + cartItem.id, cartItem),
    onMutate: async (cartItem) =>
      optimisticUpdate<CartItem[]>(queryKey, (data) =>
        data.map((item) =>
          item.id === cartItem.id ? { ...item, amount: cartItem.amount } : item
        )
      ),
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });

export const useDeleteCartItemMutation = (
  options?: Partial<
    UseMutationOptions<CartItem, Error, string, { previousData?: CartItem[] }>
  >
) =>
  useMutation({
    mutationFn: (itemId) => api.delete('/cart/' + itemId),
    onMutate: async (itemId) =>
      optimisticUpdate<CartItem[]>(queryKey, (data) =>
        data.filter((item) => item.id !== itemId)
      ),
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });

export const useClearCartMutation = (
  options?: Partial<
    UseMutationOptions<any, Error, void, { previousData?: CartItem[] }>
  >
) =>
  useMutation({
    mutationFn: () => api.delete('/cart'),
    onMutate: async () => optimisticUpdate<CartItem[]>(queryKey, () => []),
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });
