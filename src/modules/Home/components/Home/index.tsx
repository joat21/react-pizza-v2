import type { FC } from 'react';
import clsx from 'clsx';

import { Categories, Sort } from '@components';

import { useGetPizzasQuery } from '../../api/useGetPizzasQuery';

import styles from './Home.module.css';

export const Home: FC = () => {
  const { data, isLoading } = useGetPizzasQuery();

  if (!data || isLoading) return 'Loading...';

  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>Вся пицца</h2>
    </div>
  );
};
