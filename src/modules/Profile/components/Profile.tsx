import type { FC } from 'react';

import { PersonalInfo } from './PersonalInfo';
import { OrdersList } from './OrdersList';

export const Profile: FC = () => {
  return (
    <div className="container flex flex-col justify-center gap-20">
      <PersonalInfo />
      <OrdersList />
    </div>
  );
};
