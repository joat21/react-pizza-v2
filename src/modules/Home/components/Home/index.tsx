import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Home.module.css';

export const Home: FC = () => {
  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.top}>
        <div>Categories</div>
        <div>Sort</div>
        {/* <Categories />
        <Sort /> */}
      </div>
      <h2 className={styles.title}>Вся пицца</h2>
    </div>
  );
};
