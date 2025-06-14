import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@UI';
import { useLogoutMutation } from 'api/auth';

export const PersonalInfo: FC = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold leading-8">Личные данные</h1>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
};
