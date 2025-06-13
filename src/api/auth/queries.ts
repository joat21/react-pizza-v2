import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from 'api';
import type { User } from 'types';

export const useUserQuery = (options?: Partial<UseQueryOptions<User>>) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
    ...options,
  });
