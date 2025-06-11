import type { QueryKey } from '@tanstack/react-query';
import { queryClient } from 'api';

export async function optimisticUpdate<TData>(
  key: QueryKey,
  updater: (data: TData) => TData
): Promise<{ previousData?: TData }> {
  await queryClient.cancelQueries({ queryKey: key });

  const previousData = queryClient.getQueryData<TData>(key);

  queryClient.setQueryData<TData>(key, (prev) => prev && updater(prev));

  return { previousData };
}
