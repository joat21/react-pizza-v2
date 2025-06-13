import {
  useMutation,
  type QueryKey,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { queryClient } from 'api';

export function useOptimisticMutation<TData, TVariables>(
  options: Partial<
    UseMutationOptions<
      TData,
      Error,
      TVariables,
      { previousData: TData | undefined }
    >
  > & {
    queryKey: QueryKey;
    updater: (data: TData, variables: TVariables) => TData;
  }
) {
  return useMutation({
    mutationFn: options.mutationFn,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: options.queryKey });

      const previousData = queryClient.getQueryData<TData>(options.queryKey);

      queryClient.setQueryData<TData>(options.queryKey, (prev) =>
        prev ? options.updater(prev, variables) : prev
      );

      return { previousData };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(options.queryKey, context?.previousData);
      options.onError?.(error, variables, context);
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });
      options.onSuccess?.(data, variables, context);
    },

    ...options,
  });
}
