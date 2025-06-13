import { useMutation } from '@tanstack/react-query';

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
