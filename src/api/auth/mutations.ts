import type { PersonalInfoData } from '@modules/Profile/components/PersonalInfo';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { api, queryClient } from 'api';

const queryKey = ['user'];

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () => api.delete('/auth/logout'),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

export const useUpdateUserMutation = (
  options?: Partial<UseMutationOptions<any, Error, PersonalInfoData>>
) =>
  useMutation({
    mutationFn: (user) => api.patch('/auth/user', user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    ...options,
  });
