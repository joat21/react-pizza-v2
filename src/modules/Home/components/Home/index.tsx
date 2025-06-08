import type { FC } from 'react';
import clsx from 'clsx';

import { Categories, Sort } from '@components';
import { PizzaCard } from '../PizzaCard';

import { useGetCategoriesQuery } from '../../api/useGetCategoriesQuery';
import { useGetPizzasQuery } from '../../api/useGetPizzasQuery';

import styles from './Home.module.css';

export const Home: FC = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { data: pizzas, isLoading: isPizzasLoading } = useGetPizzasQuery();

  if (!pizzas || isPizzasLoading || !categories || isCategoriesLoading)
    return 'Loading...';

  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.top}>
        <Categories categories={categories} />
        <Sort />
      </div>
      <h2 className={styles.title}>Вся пицца</h2>
      <ul className="grid grid-rows-1 grid-cols-4 gap-x-12 gap-y-16">
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <PizzaCard pizza={pizza} />
          </li>
        ))}
      </ul>
    </div>
  );
};
