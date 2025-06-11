import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components';

export const MainLayout: FC = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
